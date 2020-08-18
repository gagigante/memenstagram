import { container } from 'tsyringe';

import ISMSProvider from './models/ISMSProvider';

import ConsoleSMSProvider from './implementations/ConsoleSMSProvider';
import SNSSMSProvider from './implementations/SNSSMSProvider';

container.registerSingleton<ISMSProvider>(
  'SMSProvider',
  process.env.SMS_DRIVER === 'console' ? ConsoleSMSProvider : SNSSMSProvider,
);
