// src/App.tsx
import './App.css';
import { useEsewa } from './lib/useEsewa';

function App() {
  const { initiatePayment, loading, error } = useEsewa({
    merchantId: 'EPAYTEST',
    secretKey: '8gBm/:&EnhH.1/q',
    successUrl: 'https://developer.esewa.com.np/success',
    failureUrl: 'https://developer.esewa.com.np/failure',
    isTest: true
  });

  const handlePayment = async () => {
    // Using exact values from working implementation
    await initiatePayment({
      amount: '100',
      productId: 'DNDGVIKDSNG12',
      successUrl: 'https://developer.esewa.com.np/success',
      failureUrl: 'https://developer.esewa.com.np/failure'
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>eSewa Payment Test</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button 
        id="esewa-submit-button"
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#5C2D91',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Processing...' : 'Pay with eSewa'}
      </button>
    </div>
  );
}

export default App;
