// src/lib/useEsewa.ts
import { useCallback, useState, useEffect } from 'react';
import { EsewaConfig, EsewaPayment, EsewaPaymentData } from './esewa';

export function useEsewa(config: EsewaConfig) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = useCallback(
    async (data: EsewaPaymentData) => {
      try {
        setLoading(true);
        setError(null);

        const esewa = new EsewaPayment(config);
        const formHtml = await esewa.createPaymentForm(data);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formHtml;

        const form = tempDiv.querySelector('form');
        if (!form) throw new Error('Failed to create payment form');

        document.body.appendChild(form);

        // Submit the form programmatically
        form.submit();

        // Remove the form after submission (optional)
        document.body.removeChild(form);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Payment initiation failed');
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const form = document.getElementById('esewa-payment-form');
      if (form) document.body.removeChild(form);
    };
  }, []);

  return { initiatePayment, loading, error };
}
