import express from 'express';
import mercadopago from 'mercadopago';


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-3735231558013063-102122-385b9d4afb1e5a9016c3f6f30dcde2dc-685366721');
//TEST-58c5e227-31bf-4dc5-a490-b55eaac14b57


const app = express();
const PORT = 3000;

// Configurando Mercado Pago com o accessToken
const mp = new mercadopago.MercadoPagoConfig({
  accessToken: 'TEST-3735231558013063-102122-385b9d4afb1e5a9016c3f6f30dcde2dc-685366721'
});


// Rota para processar pagamentos
app.post('/process_payment', (req, res) => {
    const paymentData = {
        transaction_amount: 100,
        token: req.body.token,
        description: 'Descrição do produto',
        payment_method_id: req.body.payment_method_id,
        payer: {
            email: req.body.payer.email
        }
    };

    mp.payment.create(paymentData)
        .then((response) => {
            res.status(201).json(response);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

