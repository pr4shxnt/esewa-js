// src/lib/esewa.ts
import CryptoJS from 'crypto-js';

export interface EsewaConfig {
  merchantId: string;
  secretKey: string;
  successUrl: string;
  failureUrl: string;
  isTest?: boolean;
}

export interface EsewaPaymentData {
  amount: string;
  productId: string;
  successUrl: string;
  failureUrl: string;
}

export class EsewaPayment {
  private baseUrl: string;
  private merchantId: string;
  private secretKey: string;
  private readonly signedFieldNames = 'total_amount,transaction_uuid,product_code';

  constructor(config: EsewaConfig) {
    this.merchantId = config.merchantId;
    this.secretKey = config.secretKey;
    this.baseUrl = config.isTest 
      ? 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
      : 'https://epay.esewa.com.np/api/epay/main/v2/form';
  }

  private createPaymentString(data: EsewaPaymentData): string {
    // Format exactly as per working implementation
    return `total_amount=${data.amount},transaction_uuid=${data.productId},product_code=${this.merchantId}`;
  }

  async generateSignature(data: EsewaPaymentData): Promise<string> {
    const message = this.createPaymentString(data);
    console.log('Message:', message);
    console.log('Secret Key:', this.secretKey);

    // Using CryptoJS exactly as in the working implementation
    const hash = CryptoJS.HmacSHA256(message, this.secretKey);
    const base64Signature = CryptoJS.enc.Base64.stringify(hash);
    
    console.log('Generated Signature:', base64Signature);
    return base64Signature;
  }

  public async createPaymentForm(data: EsewaPaymentData): Promise<string> {
    const signature = await this.generateSignature(data);
    const taxAmount = 0; // Changed to 0 to match working implementation
    const totalAmount = Number(data.amount); // No tax addition

    return `
      <form id="esewa-payment-form" action="${this.baseUrl}" method="POST" style="display:none;">
        <input type="text" name="amount" value="${data.amount}" required />
        <input type="text" name="tax_amount" value="${taxAmount}" required />
        <input type="text" name="total_amount" value="${totalAmount}" required />
        <input type="text" name="transaction_uuid" value="${data.productId}" required />
        <input type="text" name="product_code" value="${this.merchantId}" required />
        <input type="text" name="product_service_charge" value="0" required />
        <input type="text" name="product_delivery_charge" value="0" required />
        <input type="text" name="success_url" value="${data.successUrl}" required />
        <input type="text" name="failure_url" value="${data.failureUrl}" required />
        <input type="text" name="signed_field_names" value="${this.signedFieldNames}" required />
        <input type="text" name="signature" value="${signature}" required />
      </form>
    `;
  }
}
