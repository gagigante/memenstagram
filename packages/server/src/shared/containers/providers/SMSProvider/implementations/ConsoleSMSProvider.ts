import ISMSProvider from '../models/ISMSProvider';
import ISendSMSDTO from '../dtos/ISendSMSDTO';

class ConsoleSMSProvider implements ISMSProvider {
  public sendSMS({ phoneNumber, message }: ISendSMSDTO): void {
    console.log({ phoneNumber, message });
  }
}

export default ConsoleSMSProvider;
