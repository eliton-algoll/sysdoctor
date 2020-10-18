import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Person from '../entities/Person';

interface RequestDTO {
  name: string;

  cpf: string;

  birth: Date;

  cellPhone: string;

  phone: string;

  email: string;
}

class CreatePersonService {
  public async execute({
    name,
    cpf,
    birth,
    cellPhone,
    phone,
    email,
  }: RequestDTO): Promise<Person> {
    const personRepository = getRepository(Person);

    // checking if CPF exists
    const checkCPFExists = await personRepository.findOne({
      where: {
        cpf,
      },
    });

    if (checkCPFExists) {
      throw new AppError('CPF already used');
    }

    const person = personRepository.create({
      name,
      cpf,
      birth,
      cellPhone,
      phone,
      email,
    });

    await personRepository.save(person);

    return person;
  }
}

export default CreatePersonService;
