import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import CreatePostService from './CreatePostService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let fakeStorageProvider: FakeStorageProvider;
let createPostService: CreatePostService;

describe('CreatePost', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createPostService = new CreatePostService(
      fakeUsersRepository,
      fakePostsRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to create a post', async () => {
    const savePost = jest.spyOn(fakeStorageProvider, 'saveFile');

    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    const post = await createPostService.execute({
      loggedUserId: user.id,
      description: 'post-description',
      postImages: [{ image_url: 'image-url' }, { image_url: 'image-url-2' }],
    });

    expect(post).toHaveProperty('id');
    expect(savePost).toHaveBeenCalledTimes(2);
  });

  it('Should not be able to create a post with an invalid user', async () => {
    const savePost = jest.spyOn(fakeStorageProvider, 'saveFile');

    await expect(
      createPostService.execute({
        loggedUserId: 'invalid-user-id',
        description: 'post-description',
        postImages: [{ image_url: 'image-url' }],
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(savePost).toHaveBeenCalledTimes(0);
  });

  it('Should not be able to create a post with a non verified account', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      createPostService.execute({
        loggedUserId: user.id,
        description: 'post-description',
        postImages: [{ image_url: 'image-url' }],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
