import { container } from 'tsyringe';

import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/containers/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/containers/providers/StorageProvider/implementations/S3StorageProvider';

import uploadConfig from '@config/upload';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
