import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakePersonsRepository from '../../Persons/repositories/fakes/FakePersonsRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakePersonsRepository: FakePersonsRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('RecoverPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePersonsRepository = new FakePersonsRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    // create a new person
    const person = await fakePersonsRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@teste.com',
      birth: new Date(1985, 4, 10),
      cpf: '005.182.941-02',
      cellPhone: '(00) 0 0000 0000',
      phone: '(00) 0 0000 0000',
    });

    // create a new user
    const user = await fakeUsersRepository.create({
      username: 'JhonDoe',
      personId: person.id,
      profileId: '123456',
      password: '12345',
    });

    // create a token
    const token = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      token: token.token,
      password: '987987',
    });

    const finUser = await fakeUsersRepository.findById(user.id);

    expect(finUser?.password).toBe('987987');
  });

  it('should not be able to recover the password with an non-existent token', async () => {
    expect(
      resetPassword.execute({
        token: '321654',
        password: '987987',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to recover the password with an non-existent user', async () => {
    // create a token
    const token = await fakeUserTokensRepository.generate('123456');

    expect(
      resetPassword.execute({
        token: token.token,
        password: '987987',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
