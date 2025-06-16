import React, { useEffect, useState } from "react";
import {useEsewa} from "../lib/useEsewa"

type Props = { name: string, price: number, productCode: string, image: string };

const DataCard = (props: Props) => {

  const [newTransactionUuid, setnewTransactionUuid] = useState<number>(0)


useEffect(()=>{
setnewTransactionUuid(Math.floor(
  Math.random() * (99999999 - 11111111 + 1) + 11111111
))
},[props.productCode])


  const { initiatePayment, loading, error } = useEsewa({
    merchantId: 'EPAYTEST',
    secretKey: '8gBm/:&EnhH.1/q',
    successUrl: 'https://developer.esewa.com.np/success',
    failureUrl: 'https://developer.esewa.com.np/failure',
    isTest: true
  });

  const handlePayment = async () => {
    await initiatePayment({
      amount: `${props.price.toString()}`,
      productId: `${props.productCode}-${newTransactionUuid}`,
      successUrl: 'https://developer.esewa.com.np/success',
      failureUrl: 'https://developer.esewa.com.np/failure'
    });
  };
  return <div className="bg-gray-200 h-full pb-4 w-72">
      <img src={props.image} alt="" className="aspect-square w-full object-cover" />
      <h1 className="text-xl font-bold my-4 pt-4">{props.name}</h1>
      <p></p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button 
        id="esewa-submit-button"
        className=""
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
        {loading ? 'Processing...' : `Npr. ${props.price} -pay via esewa`}
      </button>
  </div>;
};

export default DataCard;
