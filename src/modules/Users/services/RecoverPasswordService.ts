import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IrequestDTO {
  email: string;
}

@injectable()
class RecoverPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email }: IrequestDTO): Promise<void> {}
}

export default RecoverPasswordService;
