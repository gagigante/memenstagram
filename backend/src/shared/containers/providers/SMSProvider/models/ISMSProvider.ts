import ISendSMSDTO from '../dtos/ISendSMSDTO';

interface ISMSProviderResponse {
  phoneNumber: string;
  subject: string;
  message: string;
}

export default interface ISMSProvider {
  sendSMS(
    data: ISendSMSDTO,
  ): Promise<ISMSProviderResponse> | ISMSProviderResponse;
}
