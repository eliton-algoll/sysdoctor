import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import UsersRepository from '../repositories/UsersRepository';
import User from '../entities/User';

interface RequestDTO {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticationService {
  public async execute({ username, password }: RequestDTO): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    // checking if user exists
    const user = await usersRepository.findOne({ where: { username } });

    if (!user) {
      throw Error('Incorrect username/password combination.');
    }

    // checking if password matches the save password
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('Incorrect username/password combination.');
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
