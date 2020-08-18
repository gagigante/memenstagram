import { container } from 'tsyringe';

import ISMSProvider from './models/ISMSProvider';

import SNSSMSProvider from './implementations/SNSSMSProvider';

container.registerSingleton<ISMSProvider>('SMSProvider', SNSSMSProvider);
