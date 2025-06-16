// src/lib/esewa.ts
import CryptoJS from 'crypto-js';
export class EsewaPayment {
    constructor(config) {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "merchantId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "secretKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "signedFieldNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'total_amount,transaction_uuid,product_code'
        });
        this.merchantId = config.merchantId;
        this.secretKey = config.secretKey;
        this.baseUrl = config.isTest
            ? 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
            : 'https://epay.esewa.com.np/api/epay/main/v2/form';
    }
    createPaymentString(data) {
        // Format exactly as per working implementation
        return `total_amount=${data.amount},transaction_uuid=${data.productId},product_code=${this.merchantId}`;
    }
    async generateSignature(data) {
        const message = this.createPaymentString(data);
        console.log('Message:', message);
        console.log('Secret Key:', this.secretKey);
        // Using CryptoJS exactly as in the working implementation
        const hash = CryptoJS.HmacSHA256(message, this.secretKey);
        const base64Signature = CryptoJS.enc.Base64.stringify(hash);
        console.log('Generated Signature:', base64Signature);
        return base64Signature;
    }
    async createPaymentForm(data) {
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
