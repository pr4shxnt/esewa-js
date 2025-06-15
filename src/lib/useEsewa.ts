import { useCallback } from 'react';
import { EsewaPayment } from './esewa';
import type { EsewaConfig, EsewaPaymentData } from './esewa';

export const useEsewa = (config: EsewaConfig) => {
  const esewa = new EsewaPayment(config);

  const initiatePayment = useCallback((data: EsewaPaymentData) => {
    const paymentUrl = esewa.generatePaymentUrl(data);
    window.location.href = paymentUrl;
  }, [esewa]);

  const verifyPayment = useCallback((
    referenceId: string,
    amount: number,
    signature: string
  ) => {
    return esewa.verifyPayment(referenceId, amount, signature);
  }, [esewa]);

  return {
    initiatePayment,
    verifyPayment,
  };
}; 