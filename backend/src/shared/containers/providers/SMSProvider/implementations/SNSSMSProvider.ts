import aws, { SNS } from 'aws-sdk';

import ISMSProvider from '../models/ISMSProvider';
import ISendSMSDTO from '../dtos/ISendSMSDTO';

interface IResponseDTO {
  phoneNumber: string;
  subject: string;
  message: string;
}

class SNSSMSProvider implements ISMSProvider {
  private client: SNS;

  constructor() {
    this.client = new aws.SNS({
      region: 'us-east-1',
    });
  }

  public async sendSMS({
    phoneNumber,
    subject,
    message,
  }: ISendSMSDTO): Promise<IResponseDTO> {
    await this.client
      .publish({
        PhoneNumber: phoneNumber,
        Message: message,
        MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: subject,
          },
        },
      })
      .promise();

    return { phoneNumber, subject, message };
  }
}

export default SNSSMSProvider;
