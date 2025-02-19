import React, { useEffect, useState } from "react";


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-58c5e227-31bf-4dc5-a490-b55eaac14b57');


const PaymentBrick = (props)=> {
  
  return (
    <div className="container">
        <Wallet
          initialization={{ preferenceId: props.preferenceId }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
        
    </div>
  );


} 

export default PaymentBrick