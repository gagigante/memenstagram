import ISMSProvider from '../models/ISMSProvider';
import ISendSMSDTO from '../dtos/ISendSMSDTO';

export default class FakeSMSProvider implements ISMSProvider {
  private messages: ISendSMSDTO[] = [];

  public async sendSMS({ phoneNumber, message }: ISendSMSDTO): Promise<void> {
    this.messages.push({ phoneNumber, message });
  }
}
