import { v4 as uuid } from 'uuid';

import IUserTokensRepository from '@modules/Users/repositories/IUserTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: uuid(), token: uuid(), userId });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = this.userTokens.find(
      userToken => userToken.token === token,
    );

    return findToken;
  }
}

export default FakeUserTokensRepository;
