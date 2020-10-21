import { v4 as uuid } from 'uuid';

import IPersonRepository from '@modules/Persons/repositories/IPersonsRepository';
import ICreatePersonDTO from '@modules/Persons/dtos/ICreatePersonDTO';
import Person from '../../infra/typeorm/entities/Person';

class PersonsRepository implements IPersonRepository {
  private persons: Person[] = [];

  public async create(data: ICreatePersonDTO): Promise<Person> {
    const person = new Person();

    Object.assign(person, { id: uuid() }, data);

    this.persons.push(person);

    return person;
  }

  public async save(person: Person): Promise<Person> {
    const findIndex = this.persons.findIndex(
      personData => personData.id === person.id,
    );

    this.persons[findIndex] = person;

    return person;
  }

  public async findAll(): Promise<Person[]> {
    return new Promise(() => this.persons);
  }

  // filter appointment in especific date
  public async findByCpf(cpf: string): Promise<Person | undefined> {
    const findPerson = this.persons.find(person => person.cpf === cpf);
    return findPerson;
  }

  public async findById(id: string): Promise<Person | undefined> {
    const findPerson = this.persons.find(person => person.id === id);

    return findPerson;
  }

  public async findByEmail(email: string): Promise<Person | undefined> {
    const findPerson = this.persons.find(person => person.email === email);

    return findPerson;
  }
}

export default PersonsRepository;
