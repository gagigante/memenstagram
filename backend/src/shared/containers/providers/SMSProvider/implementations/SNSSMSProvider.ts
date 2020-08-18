import aws, { SNS } from 'aws-sdk';

import ISMSProvider from '../models/ISMSProvider';
import ISendSMSDTO from '../dtos/ISendSMSDTO';

class SNSSMSProvider implements ISMSProvider {
  private client: SNS;

  constructor() {
    this.client = new aws.SNS({
      region: 'us-east-1',
    });
  }

  public async sendSMS({
    message,
    subject,
    phoneNumber,
  }: ISendSMSDTO): Promise<void> {
    await this.client
      .publish({
        Message: message,
        Subject: subject,
        PhoneNumber: phoneNumber,
      })
      .promise();
  }
}

export default SNSSMSProvider;
