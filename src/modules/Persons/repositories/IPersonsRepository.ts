import Person from '@modules/Persons/infra/typeorm/entities/Person';
import ICreatePersonDTO from '../dtos/ICreatePersonDTO';

interface IPersonsRepository {
  create(data: ICreatePersonDTO): Promise<Person>;

  save(person: Person): Promise<Person>;

  findAll(): Promise<Person[]>;

  findByCpf(cpf: string): Promise<Person | undefined>;

  findById(id: string): Promise<Person | undefined>;
}

export default IPersonsRepository;
