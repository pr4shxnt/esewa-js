# esewa-react

A React library for integrating eSewa payment gateway into your React applications. This library handles hash signatures, base64 URL encoding, and provides a simple interface for initiating and verifying eSewa payments.

[![npm version](https://img.shields.io/npm/v/esewa-react.svg)](https://www.npmjs.com/package/esewa-react)
[![GitHub stars](https://img.shields.io/github/stars/pr4shxnt/esewa-js.svg?style=social)](https://github.com/pr4shxnt/esewa-js)

## Installation

```bash
npm install esewa-react
# or
yarn add esewa-react
```

## Features

- Generate eSewa payment URLs with proper signature
- Verify payment responses
- React hook for easy integration
- TypeScript support
- Test and production environment support

## Usage

### Basic Usage with React Hook

```tsx
import { useEsewa } from 'esewa-react';

const YourComponent = () => {
  const { initiatePayment } = useEsewa({
    merchantId: 'YOUR_MERCHANT_ID',
    successUrl: 'https://your-domain.com/success',
    failureUrl: 'https://your-domain.com/failure',
    secretKey: 'YOUR_SECRET_KEY',
    isTest: true,
  });

  const handlePayment = () => {
    initiatePayment({
      amount: '100',
      productId: 'TXN_ID',
      successUrl: 'https://your-domain.com/success',
      failureUrl: 'https://your-domain.com/failure',
    });
  };

  return (
    <button onClick={handlePayment}>
      Pay with eSewa
    </button>
  );
};
```

### Using the Payment Button Component

```tsx
import { EsewaPaymentButton } from 'esewa-react';

const YourComponent = () => {
  return (
    <EsewaPaymentButton
      merchantId="YOUR_MERCHANT_ID"
      environment="test"
      successUrl="https://your-domain.com/success"
      failureUrl="https://your-domain.com/failure"
      secretKey="YOUR_SECRET_KEY"
      paymentData={{
        amount: 1000,
        taxAmount: 130,
        serviceCharge: 0,
        deliveryCharge: 0,
        productCode: 'EPAYTEST',
        productName: 'Test Product',
        productId: '123456',
        referenceId: 'REF123456',
      }}
      className="custom-button-class"
    >
      Pay with eSewa
    </EsewaPaymentButton>
  );
};
```

### Verifying Payment Response

```tsx
import { useEsewa } from 'esewa-react';

const SuccessPage = () => {
  const { verifyPayment } = useEsewa({
    merchantId: 'YOUR_MERCHANT_ID',
    environment: 'test',
    successUrl: 'https://your-domain.com/success',
    failureUrl: 'https://your-domain.com/failure',
    secretKey: 'YOUR_SECRET_KEY',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referenceId = params.get('refId');
    const amount = params.get('amt');
    const signature = params.get('signature');

    if (referenceId && amount && signature) {
      const isValid = verifyPayment(
        referenceId,
        Number(amount),
        signature
      );

      if (isValid) {
        // Payment is valid
        console.log('Payment successful!');
      } else {
        // Payment verification failed
        console.error('Payment verification failed!');
      }
    }
  }, [verifyPayment]);

  return <div>Processing payment...</div>;
};
```

## Configuration

The library requires the following configuration:

- `merchantId`: Your eSewa merchant ID
- `successUrl`: URL to redirect after successful payment
- `failureUrl`: URL to redirect after failed payment
- `secretKey`: Your eSewa secret key
- `isTest`: Boolean, set to true for test environment

## Payment Data

The payment data object should include:

- `amount`: Base amount
- `taxAmount`: Tax amount
- `serviceCharge`: Service charge
- `deliveryCharge`: Delivery charge
- `productCode`: Product code
- `productName`: Product name
- `productId`: Product ID
- `referenceId`: Unique reference ID for the transaction

## Security

- Always use environment variables for sensitive data like `merchantId` and `secretKey`
- Verify all payment responses using the `verifyPayment` method
- Use HTTPS for all URLs
- Keep your secret key secure and never expose it in client-side code

## License

MIT

---

- [GitHub Repository](https://github.com/pr4shxnt/esewa-js)
- [Report Issues](https://github.com/pr4shxnt/esewa-js/issues)
- [NPM Package](https://www.npmjs.com/package/esewa-react)
