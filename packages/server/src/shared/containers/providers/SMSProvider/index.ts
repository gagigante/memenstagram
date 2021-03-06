import { container } from 'tsyringe';

import ISMSProvider from './models/ISMSProvider';

import ConsoleSMSProvider from './implementations/ConsoleSMSProvider';
import TwilioSMSProvider from './implementations/TwilioSMSProvider';

container.registerSingleton<ISMSProvider>(
  'SMSProvider',
  process.env.SMS_DRIVER === 'console' ? ConsoleSMSProvider : TwilioSMSProvider,
);
