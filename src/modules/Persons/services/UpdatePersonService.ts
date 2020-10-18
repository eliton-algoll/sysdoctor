import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPersonsRepository from '@modules/Persons/repositories/IPersonsRepository';
import Person from '../infra/typeorm/entities/Person';

interface IRequestDTO {
  id: string;

  name: string;

  cpf: string;

  birth: Date;

  cellPhone: string;

  phone: string;

  email: string;
}

@injectable()
class UpdatePersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    id,
    name,
    cpf,
    birth,
    cellPhone,
    phone,
    email,
  }: IRequestDTO): Promise<Person> {
    const person = await this.personsRepository.findById(id);

    if (!person) {
      throw new AppError('Person not found', 404);
    }

    if (cpf !== person.cpf) {
      // checking if CPF exists
      const checkCPFExists = await this.personsRepository.findByCpf(cpf);

      if (checkCPFExists) {
        throw new AppError('CPF already used');
      }
    }

    const personSaved = this.personsRepository.save({
      ...person,
      name,
      cpf,
      birth,
      cellPhone,
      phone,
      email,
    });

    return personSaved;
  }
}

export default UpdatePersonService;
