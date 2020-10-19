import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      username: 'algoll',
      personId: '123456',
      password: '123',
      profileId: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.profileId).toBe('123456');
  });

  it('should not be able create two users on the same username', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      username: 'algoll',
      personId: '123456',
      password: '123',
      profileId: '123456',
    });

    expect(
      createUser.execute({
        username: 'algoll',
        personId: '123456',
        password: '123',
        profileId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
