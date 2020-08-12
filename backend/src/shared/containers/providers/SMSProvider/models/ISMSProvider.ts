import ISendSMSDTO from '../dtos/ISendSMSDTO';

export default interface ISMSProvider {
  sendSMS(data: ISendSMSDTO): Promise<void>;
}
