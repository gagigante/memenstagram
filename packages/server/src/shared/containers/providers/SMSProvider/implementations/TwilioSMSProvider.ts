import ISMSProvider from '../models/ISMSProvider';
import ISendSMSDTO from '../dtos/ISendSMSDTO';

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

class TwilioSMSProvider implements ISMSProvider {
  public async sendSMS({ phoneNumber, message }: ISendSMSDTO): Promise<void> {
    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
      body: message,
    });
    // .then(message => console.log(message.sid));
  }
}

export default TwilioSMSProvider;
