import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import UsersRepository from '../repositories/UsersRepository';
import User from '../entities/User';

interface requestDTO {
  username: string;

  personId: string;

  password: string;
}

class CreateUserService {
  public async execute({
    username,
    password,
    personId,
  }: requestDTO): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    // checking if user exists
    const userExist = await userRepository.findByUsernameOrId(
      username,
      personId,
    );

    if (userExist) {
      throw new AppError('User already exists');
    }

    const hashedPassowrd = await hash(password, 8);

    const user = userRepository.create({
      username,
      password: hashedPassowrd,
      personId,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
