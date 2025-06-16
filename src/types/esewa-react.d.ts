declare module 'esewa-react' {
  export interface EsewaConfig {
    merchantId: string;
    secretKey: string;
    successUrl: string;
    failureUrl: string;
    isTest?: boolean;
  }

  export interface EsewaPaymentData {
    amount: number | string;
    productId: string;
    successUrl: string;
    failureUrl: string;
  }

  export interface UseEsewaReturn {
    initiatePayment: (data: EsewaPaymentData) => Promise<void>;
    loading: boolean;
    error: string | null;
  }

  export function useEsewa(config: EsewaConfig): UseEsewaReturn;
} 