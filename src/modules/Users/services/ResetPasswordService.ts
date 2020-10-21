import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/Users/repositories/IUserTokensRepository';

interface IrequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IrequestDTO): Promise<void> {
    const findToken = await this.userTokensRepository.findByToken(token);

    if (!findToken) {
      throw new AppError('User Token does not exists');
    }

    const user = await this.usersRepository.findById(findToken.userId);

    if (!user) {
      throw new AppError('User  does not exists');
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
