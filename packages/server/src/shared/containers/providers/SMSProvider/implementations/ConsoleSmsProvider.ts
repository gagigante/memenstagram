import ISmsProvider from '../models/ISmsProvider';
import ISendSmsDTO from '../dtos/ISendSmsDTO';

class ConsoleSMSProvider implements ISmsProvider {
  public sendSMS({ phoneNumber, message }: ISendSmsDTO): void {
    console.log({ phoneNumber, message });
  }
}

export default ConsoleSMSProvider;
