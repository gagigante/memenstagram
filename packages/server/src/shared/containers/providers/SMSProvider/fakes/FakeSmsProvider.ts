import ISmsProvider from '../models/ISmsProvider';
import ISendSmsDTO from '../dtos/ISendSmsDTO';

export default class FakeSMSProvider implements ISmsProvider {
  private messages: ISendSmsDTO[] = [];

  public async sendSMS({ phoneNumber, message }: ISendSmsDTO): Promise<void> {
    this.messages.push({ phoneNumber, message });
  }
}
