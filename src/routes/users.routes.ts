import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

const userRouter = Router();

// list all users
userRouter.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UsersRepository);

  const users = await userRepository.find();

  return response.json(users);
});

// create one user
userRouter.post('/', async (request, response) => {
  try {
    const { personId, username, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ personId, username, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default userRouter;
