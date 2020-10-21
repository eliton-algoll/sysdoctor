import { v4 as uuid } from 'uuid';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/Users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  // create an Appointment
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userSave = new User();

    Object.assign(userSave, user);

    const indexprofile = this.users.findIndex(
      userData => userData.id === userSave.id,
    );

    this.users[indexprofile] = userSave;

    return userSave;
  }

  public findAll(): Promise<User[]> {
    return new Promise(() => this.users);
  }

  // filter appointment in especific date
  public async findByUsernameOrPersonId(
    username: string,
    personId: string,
  ): Promise<User | undefined> {
    const findUser = this.users.find(
      userData =>
        userData.username === username || userData.personId === personId,
    );

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(userData => userData.id === id);

    return findUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = this.users.find(
      userData => userData.username === username,
    );

    return findUser;
  }

  public async findByPersonId(personId: string): Promise<User | undefined> {
    const findUser = this.users.find(
      userData => userData.personId === personId,
    );

    return findUser;
  }
}

export default FakeUsersRepository;
