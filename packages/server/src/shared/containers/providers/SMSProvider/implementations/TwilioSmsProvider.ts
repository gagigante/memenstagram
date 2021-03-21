import twilio from 'twilio';

import ISmsProvider from '../models/ISmsProvider';
import ISendSmsDTO from '../dtos/ISendSmsDTO';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

class TwilioSMSProvider implements ISmsProvider {
  public async sendSMS({ phoneNumber, message }: ISendSmsDTO): Promise<void> {
    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
      body: message,
    });
  }
}

export default TwilioSMSProvider;
