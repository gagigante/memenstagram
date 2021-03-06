import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendActivationCodeSmsService from '@modules/users/services/SendActivationCodeSmsService';

export default class SMSAccountCodeController {
  public async send(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const sendActivationCodeSmsService = container.resolve(
      SendActivationCodeSmsService,
    );

    const apiResponse = await sendActivationCodeSmsService.execute({
      userId: user_id,
    });

    return response.json(apiResponse);
  }
}
