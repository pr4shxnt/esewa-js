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

## Quick Start

```tsx
import { useEsewa } from 'esewa-react';

function PaymentButton() {
  const { initiatePayment, loading, error } = useEsewa({
    merchantId: 'YOUR_MERCHANT_ID',
    successUrl: 'https://your-domain.com/success',
    failureUrl: 'https://your-domain.com/failure',
    secretKey: 'YOUR_SECRET_KEY',
    isTest: true, // Set to false for production
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
    <div>
      {error && <div className="error">{error}</div>}
      <button 
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay with eSewa'}
      </button>
    </div>
  );
}
```

## Features

- 🚀 Simple React hook for easy integration
- 🔒 Secure payment handling with proper signatures
- 📦 TypeScript support out of the box
- 🧪 Test and production environment support
- ⚡️ Lightweight and fast

## API Reference

### useEsewa Hook

```typescript
const { initiatePayment, loading, error } = useEsewa(config);
```

#### Config Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| merchantId | string | Yes | Your eSewa merchant ID |
| secretKey | string | Yes | Your eSewa secret key |
| successUrl | string | Yes | URL to redirect after successful payment |
| failureUrl | string | Yes | URL to redirect after failed payment |
| isTest | boolean | No | Set to true for test environment |

#### Payment Data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| amount | string | Yes | Payment amount |
| productId | string | Yes | Unique transaction ID |
| successUrl | string | Yes | Success callback URL |
| failureUrl | string | Yes | Failure callback URL |

## Security Best Practices

1. Always use environment variables for sensitive data:
```env
VITE_ESEWA_MERCHANT_ID=your_merchant_id
VITE_ESEWA_SECRET_KEY=your_secret_key
VITE_ESEWA_SUCCESS_URL=https://your-domain.com/success
VITE_ESEWA_FAILURE_URL=https://your-domain.com/failure
```

2. Use HTTPS for all URLs in production
3. Keep your secret key secure and never expose it in client-side code
4. Test thoroughly in test mode before going to production

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

---

- [GitHub Repository](https://github.com/pr4shxnt/esewa-js)
- [Report Issues](https://github.com/pr4shxnt/esewa-js/issues)
- [NPM Package](https://www.npmjs.com/package/esewa-react)
