import express, { Request, Response } from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

const app = express();
const port = 3000;

dotenv.config();

// Configurar las credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const toPhoneNumber = process.env.TO_PHONE_NUMBER;

// Verificar que todas las variables de entorno estén configuradas
if (!accountSid || !authToken || !twilioPhoneNumber || !toPhoneNumber) {
  console.error('Faltan configuraciones en las variables de entorno.');
  process.exit(1);
}

const twilioClient = twilio(accountSid, authToken);

app.get('/',  (req: Request, res: Response) => {
  res.send('Hola Mundo');
});

app.get('/enviar', async (req: Request, res: Response) => {
  try {
    // Enviar mensaje SMS con Twilio
    const message = await twilioClient.messages.create({
      body: 'Hola mundo',
      from: twilioPhoneNumber,
      to: toPhoneNumber,
    });

    console.log('Mensaje enviado con SID:', message.sid);
  } catch (error) {
    res.send('Se callo el servidor fail');
  }
});



app.listen(port, () => {
  console.log(`Servidor escuchando.....`);
});
