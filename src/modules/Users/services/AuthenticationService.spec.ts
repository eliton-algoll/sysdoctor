import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticationService from './AuthenticationService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticationService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      username: 'algoll',
      personId: '123456',
      password: '123',
      profileId: '123456',
    });

    const authenticate = await authenticateUser.execute({
      username: 'algoll',
      password: '123',
    });

    expect(authenticate).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticationService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        username: 'algoll',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticationService(
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
      authenticateUser.execute({
        username: 'algoll',
        password: '987',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
