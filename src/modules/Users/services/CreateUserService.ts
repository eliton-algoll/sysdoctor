import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
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
  ) {}

  public async execute({
    username,
    profileId,
    password,
    personId,
  }: IrequestDTO): Promise<User> {
    // checking if user exists
    const userExist = await this.usersRepository.findByUsernameOrId(
      username,
      personId,
    );

    if (userExist) {
      throw new AppError('User already exists');
    }

    const hashedPassowrd = await hash(password, 8);

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
