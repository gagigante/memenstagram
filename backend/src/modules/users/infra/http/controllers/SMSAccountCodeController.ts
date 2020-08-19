import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendActivationCodeSmsService from '@modules/users/services/SendActivationCodeSmsService';

export default class SMSAccountCodeController {
  public async send(request: Request, response: Response): Promise<Response> {
    const { phone_number } = request.body;

    const sendActivationCodeSmsService = container.resolve(
      SendActivationCodeSmsService,
    );

    const apiResponse = await sendActivationCodeSmsService.execute({
      phoneNumber: phone_number,
    });

    return response.json(apiResponse);
  }
}
