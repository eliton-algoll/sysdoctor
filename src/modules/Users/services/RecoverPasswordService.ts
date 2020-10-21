import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IPersonsRepository from '@modules/Persons/repositories/IPersonsRepository';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/Users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/MailProvider/models/IMailPRovider';

interface IrequestDTO {
  email: string;
}

@injectable()
class RecoverPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IrequestDTO): Promise<void> {
    const personExist = await this.personsRepository.findByEmail(email);

    // verify if existing person with email
    if (!personExist) {
      throw new AppError('Person does not exists.');
    }

    const userExist = await this.usersRepository.findByPersonId(personExist.id);

    // verify if existing person with email
    if (!userExist) {
      throw new AppError('User does not exists.');
    }

    await this.userTokensRepository.generate(userExist.id);

    // const userExists = await this.usersRepository.findByPersonEmail();

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default RecoverPasswordService;
