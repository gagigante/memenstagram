import { container } from 'tsyringe';

import ISmsProvider from './models/ISmsProvider';
import ConsoleSmsProvider from './implementations/ConsoleSmsProvider';
import TwilioSmsProvider from './implementations/TwilioSmsProvider';

container.registerSingleton<ISmsProvider>(
  'SMSProvider',
  process.env.SMS_DRIVER === 'console' ? ConsoleSmsProvider : TwilioSmsProvider,
);
