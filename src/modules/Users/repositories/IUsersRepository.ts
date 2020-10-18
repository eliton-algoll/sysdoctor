import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;

  save(user: User): Promise<User>;

  findAll(): Promise<User[]>;

  findById(id: string): Promise<User | undefined>;

  findByUsernameOrId(username: string, id: string): Promise<User | undefined>;

  findByUsername(username: string): Promise<User | undefined>;
}

export default IUserRepository;
