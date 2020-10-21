import { getRepository, Repository } from 'typeorm';
import IPersonRepository from '@modules/Persons/repositories/IPersonsRepository';
import ICreatePersonDTO from '@modules/Persons/dtos/ICreatePersonDTO';
import Person from '../entities/Person';

class PersonsRepository implements IPersonRepository {
  private ormRepository: Repository<Person>;

  constructor() {
    this.ormRepository = getRepository(Person);
  }

  public async create(data: ICreatePersonDTO): Promise<Person> {
    const person = this.ormRepository.create(data);
    await this.ormRepository.save(person);

    return person;
  }

  public async save(person: Person): Promise<Person> {
    return this.ormRepository.save(person);
  }

  public async findAll(): Promise<Person[]> {
    return this.ormRepository.find();
  }

  // filter appointment in especific date
  public async findByCpf(cpf: string): Promise<Person | undefined> {
    return this.ormRepository.findOne({
      where: {
        cpf,
      },
    });
  }

  public async findById(id: string): Promise<Person | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<Person | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }
}

export default PersonsRepository;
