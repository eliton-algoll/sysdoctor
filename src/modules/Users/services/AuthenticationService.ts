import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface RequestDTO {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ username, password }: RequestDTO): Promise<Response> {
    // checking if user exists
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    // checking if password matches the save password
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticationService;
