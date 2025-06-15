import crypto from 'crypto';

export interface EsewaConfig {
  merchantId: string;
  environment: 'test' | 'production';
  successUrl: string;
  failureUrl: string;
  secretKey: string;
}

export interface EsewaPaymentData {
  amount: number;
  taxAmount: number;
  serviceCharge: number;
  deliveryCharge: number;
  productCode: string;
  productName: string;
  productId: string;
  referenceId: string;
}

export class EsewaPayment {
  private config: EsewaConfig;
  private baseUrl: string;

  constructor(config: EsewaConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'production'
      ? 'https://esewa.com.np/epay/main'
      : 'https://uat.esewa.com.np/epay/main';
  }

  private generateSignature(data: string): string {
    const hmac = crypto.createHmac('sha256', this.config.secretKey);
    hmac.update(data);
    return hmac.digest('base64');
  }

  private createPaymentString(data: EsewaPaymentData): string {
    const {
      amount,
      taxAmount,
      serviceCharge,
      deliveryCharge,
      productCode,
      productName,
      productId,
      referenceId,
    } = data;

    const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;
    
    return `total_amount=${totalAmount},transaction_uuid=${referenceId},product_code=${productCode}`;
  }

  public generatePaymentUrl(data: EsewaPaymentData): string {
    const paymentString = this.createPaymentString(data);
    const signature = this.generateSignature(paymentString);
    
    const params = new URLSearchParams({
      amt: String(data.amount),
      psc: String(data.serviceCharge),
      pdc: String(data.deliveryCharge),
      txAmt: String(data.taxAmount),
      tAmt: String(data.amount + data.taxAmount + data.serviceCharge + data.deliveryCharge),
      pid: data.productId,
      scd: this.config.merchantId,
      su: this.config.successUrl,
      fu: this.config.failureUrl,
      signature: signature,
    });

    return `${this.baseUrl}?${params.toString()}`;
  }

  public verifyPayment(
    referenceId: string,
    amount: number,
    signature: string
  ): boolean {
    const data = `total_amount=${amount},transaction_uuid=${referenceId}`;
    const expectedSignature = this.generateSignature(data);
    return signature === expectedSignature;
  }
} 