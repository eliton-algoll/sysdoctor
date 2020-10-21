import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakePersonsRepository from '../../Persons/repositories/fakes/FakePersonsRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import RecoverPasswordService from './RecoverPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakePersonsRepository: FakePersonsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let recoverPassword: RecoverPasswordService;

describe('RecoverPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePersonsRepository = new FakePersonsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    recoverPassword = new RecoverPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakePersonsRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

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
    await fakeUsersRepository.create({
      username: 'JhonDoe',
      personId: person.id,
      profileId: '123456',
      password: '12345',
    });

    await recoverPassword.execute({
      email: 'jhon@teste.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a password from a person who does not exist ', async () => {
    await expect(
      recoverPassword.execute({
        email: 'jhon@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to recover a password from a person who does not exist', async () => {
    // create a new person
    await fakePersonsRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@teste.com',
      birth: new Date(1985, 4, 10),
      cpf: '005.182.941-02',
      cellPhone: '(00) 0 0000 0000',
      phone: '(00) 0 0000 0000',
    });

    await expect(
      recoverPassword.execute({
        email: 'jhon@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a recover password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

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

    await recoverPassword.execute({
      email: 'jhon@teste.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
