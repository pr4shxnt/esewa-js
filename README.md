# React eSewa Integration Library

A React library for integrating eSewa payment gateway into your React applications. This library handles hash signatures, base64 URL encoding, and provides a simple interface for initiating and verifying eSewa payments.

## Installation

```bash
npm install esewa-js
# or
yarn add esewa-js
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
import { useEsewa } from 'esewa-js';

const YourComponent = () => {
  const { initiatePayment, verifyPayment } = useEsewa({
    merchantId: 'YOUR_MERCHANT_ID',
    environment: 'test', // or 'production'
    successUrl: 'https://your-domain.com/success',
    failureUrl: 'https://your-domain.com/failure',
    secretKey: 'YOUR_SECRET_KEY',
  });

  const handlePayment = () => {
    initiatePayment({
      amount: 1000,
      taxAmount: 130,
      serviceCharge: 0,
      deliveryCharge: 0,
      productCode: 'EPAYTEST',
      productName: 'Test Product',
      productId: '123456',
      referenceId: 'REF123456',
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
import { EsewaPaymentButton } from 'esewa-js';

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
import { useEsewa } from 'esewa-js';

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
- `environment`: Either 'test' or 'production'
- `successUrl`: URL to redirect after successful payment
- `failureUrl`: URL to redirect after failed payment
- `secretKey`: Your eSewa secret key

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
