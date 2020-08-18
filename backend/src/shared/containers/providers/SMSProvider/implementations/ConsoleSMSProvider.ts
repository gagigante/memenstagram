import ISMSProvider from '../models/ISMSProvider';
import ISendSMSDTO from '../dtos/ISendSMSDTO';

interface IResponseDTO {
  phoneNumber: string;
  subject: string;
  message: string;
}

class ConsoleSMSProvider implements ISMSProvider {
  public sendSMS({ phoneNumber, subject, message }: ISendSMSDTO): IResponseDTO {
    console.log({ phoneNumber, subject, message });

    return {
      subject,
      phoneNumber,
      message,
    };
  }
}

export default ConsoleSMSProvider;
