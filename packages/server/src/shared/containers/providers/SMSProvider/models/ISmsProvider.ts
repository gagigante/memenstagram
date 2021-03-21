import ISendSmsDTO from '../dtos/ISendSmsDTO';

export default interface ISmsProvider {
  sendSMS(data: ISendSmsDTO): Promise<void> | void;
}
