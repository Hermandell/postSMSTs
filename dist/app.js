"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = 3000;
dotenv_1.default.config();
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
const twilioClient = (0, twilio_1.default)(accountSid, authToken);
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});
app.get('/enviar', async (req, res) => {
    try {
        // Enviar mensaje SMS con Twilio
        const message = await twilioClient.messages.create({
            body: 'Hola mundo',
            from: twilioPhoneNumber,
            to: toPhoneNumber,
        });
        console.log('Mensaje enviado con SID:', message.sid);
    }
    catch (error) {
        res.send('Se callo el servidor fail');
    }
});
app.listen(port, () => {
    console.log(`Servidor escuchando.....`);
});
