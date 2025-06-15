import React from 'react';
import { useEsewa } from '../lib/useEsewa';
import type { EsewaPaymentData } from '../lib/esewa';

interface EsewaPaymentButtonProps {
  merchantId: string;
  environment: 'test' | 'production';
  successUrl: string;
  failureUrl: string;
  secretKey: string;
  paymentData: EsewaPaymentData;
  className?: string;
  children?: React.ReactNode;
}

export const EsewaPaymentButton: React.FC<EsewaPaymentButtonProps> = ({
  merchantId,
  environment,
  successUrl,
  failureUrl,
  secretKey,
  paymentData,
  className = '',
  children = 'Pay with eSewa',
}) => {
  const { initiatePayment } = useEsewa({
    merchantId,
    environment,
    successUrl,
    failureUrl,
    secretKey,
  });

  const handlePayment = () => {
    initiatePayment(paymentData);
  };

  return (
    <button
      onClick={handlePayment}
      className={`esewa-payment-button ${className}`}
      type="button"
    >
      {children}
    </button>
  );
}; 