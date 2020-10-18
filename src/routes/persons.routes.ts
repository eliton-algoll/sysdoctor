import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePersonService from '../services/CreatePersonservice';
import Person from '../entities/Person';

const personsRouter = Router();

// list all persons
personsRouter.get('/', async (request, response) => {
  const personRespository = getRepository(Person);

  const persons = await personRespository.find();

  return response.json(persons);
});

// create person
personsRouter.post('/', async (request, response) => {
  try {
    const createPerson = new CreatePersonService();

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
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default personsRouter;
