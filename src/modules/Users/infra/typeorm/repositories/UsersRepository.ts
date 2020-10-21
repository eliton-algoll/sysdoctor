import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/Users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/Users/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  // filter appointment in especific date
  public async findByUsernameOrPersonId(
    username: string,
    personId: string,
  ): Promise<User | undefined> {
    const findUser = await this.ormRepository
      .createQueryBuilder('user')
      .where('user.username = :username OR user.personId = :personId', {
        username,
        personId,
      })
      .getOne();

    return findUser || undefined;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        username,
      },
    });
  }

  public async findByPersonId(personId: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        personId,
      },
    });
  }
}

export default UsersRepository;
