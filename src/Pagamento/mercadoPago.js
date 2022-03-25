const express = require('express');
const mercadopago = require('mercadopago');
require('dotenv').config();
const mercadoPagoAccessToken =process.env.MERCADO_PAGO_ACCESS_TOKEN;
if (!mercadoPagoAccessToken) {
  console.log("Error: access token not defined");
  process.exit(1);
}

mercadopago.configurations.setAccessToken(mercadoPagoAccessToken);

const app = express();

app.use(express.urlencoded({ extended: false }));

 async function Pagamento(req){
    const requestBody = req.body;
    const data = {
      payment_method_id: "pix",
      description: requestBody.description,
      transaction_amount: Number(requestBody.transactionamount),
      payer: {
        email: requestBody.payer.email,
        first_name: '',//requestBody.payer.firstName,
        last_name: '',//requestBody.payer.lastName,
        // identification: {
        //   type: requestBody.payer.identification.type,
        //   number: requestBody.payer.identification.number,
        // }
      }
    };

  let resposta ={};
   await mercadopago.payment.create(data)
      .then(function(data) {
          const { response } = data;
          if(response.status){
             resposta =
              {
                id: response.id,
                status: response.status,
                detail: response.status_detail,
                qrCode: response.point_of_interaction.transaction_data.qr_code,
                qrCodeBase64: response.point_of_interaction.transaction_data.qr_code_base64,
              }
          }
         
      })
      .catch(function(error) {
        console.log(error);
        const { errorMessage, errorStatus }  = validateError(error);
        res.status(errorStatus).json({ error_message: errorMessage });
      });
      return [resposta.qrCode,resposta.qrCodeBase64,resposta.id]
  };
  
  function validateError(error) {
    let errorMessage = 'Unknown error cause';
    let errorStatus = 400;}
    module.exports ={ Pagamento}