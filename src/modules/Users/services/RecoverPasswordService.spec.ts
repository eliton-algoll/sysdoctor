import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import RecoverPasswordService from './RecoverPasswordService';

describe('RecoverPassword', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const recoverPassword = new RecoverPasswordService(fakeUsersRepository);

    const user = await recoverPassword.execute({
      email: 'jhon@teste.com',
    });

    expect(user).toHaveProperty('id');
  });
});
