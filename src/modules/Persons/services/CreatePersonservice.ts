import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPersonsRepository from '@modules/Persons/repositories/IPersonsRepository';
import Person from '../infra/typeorm/entities/Person';

interface IRequestDTO {
  name: string;

  cpf: string;

  birth: Date;

  cellPhone: string;

  phone: string;

  email: string;
}

@injectable()
class CreatePersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    name,
    cpf,
    birth,
    cellPhone,
    phone,
    email,
  }: IRequestDTO): Promise<Person> {
    // checking if CPF exists
    const checkCPFExists = await this.personsRepository.findByCpf(cpf);

    if (checkCPFExists) {
      throw new AppError('CPF already used');
    }

    const person = this.personsRepository.create({
      name,
      cpf,
      birth,
      cellPhone,
      phone,
      email,
    });

    return person;
  }
}

export default CreatePersonService;
