import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { container } from 'tsyringe';

import Person from '@modules/Persons/infra/typeorm/entities/Person';

import CreatePersonService from '@modules/Persons/services/CreatePersonservice';
import UpdatePersonService from '@modules/Persons/services/UpdatePersonService';

class PersonsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const personRespository = getRepository(Person);

    const persons = await personRespository.find();

    return response.json(persons);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createPerson = container.resolve(CreatePersonService);

    const { name, cpf, birth, cellPhone, phone, email } = request.body;

    const person = await createPerson.execute({
      name,
      cpf,
      birth,
      cellPhone,
      phone,
      email,
    });

    return response.json(person);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updatePerson = container.resolve(UpdatePersonService);

    const { id, name, cpf, birth, cellPhone, phone, email } = request.body;

    const person = await updatePerson.execute({
      id,
      name,
      cpf,
      birth,
      cellPhone,
      phone,
      email,
    });

    return response.json(person);
  }
}

export default PersonsController;
