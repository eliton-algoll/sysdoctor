import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/Users/services/CreateUserService';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const users = await usersRepository.findAll();

    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { personId, profileId, username, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      personId,
      profileId,
      username,
      password,
    });

    return response.json(user);
  }
}

export default UsersController;
