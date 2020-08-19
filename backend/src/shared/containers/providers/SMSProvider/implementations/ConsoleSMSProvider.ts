import ISMSProvider from '../models/ISMSProvider';
import ISendSMSDTO from '../dtos/ISendSMSDTO';

class ConsoleSMSProvider implements ISMSProvider {
  public sendSMS({ phoneNumber, subject, message }: ISendSMSDTO): void {
    console.log({ phoneNumber, subject, message });
  }
}

export default ConsoleSMSProvider;
