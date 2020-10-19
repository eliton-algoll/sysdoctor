import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IrequestDTO {
  username: string;

  personId: string;

  profileId: string;

  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    profileId,
    password,
    personId,
  }: IrequestDTO): Promise<User> {
    // checking if user exists
    const userExist = await this.usersRepository.findByUsernameOrPersonId(
      username,
      personId,
    );

    if (userExist) {
      throw new AppError('User already exists');
    }

    const hashedPassowrd = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      username,
      password: hashedPassowrd,
      personId,
      profileId,
    });

    return user;
  }
}

export default CreateUserService;
