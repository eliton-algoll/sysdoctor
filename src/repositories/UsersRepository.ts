import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  // filter appointment in especific date
  public async findByUsernameOrId(
    username: string,
    personId: string,
  ): Promise<User | null> {
    const findUser = await this.createQueryBuilder('user')
      .where('user.username = :username OR user.personId = :personId', {
        username,
        personId,
      })
      .getOne();

    return findUser || null;
  }
}

export default UsersRepository;
