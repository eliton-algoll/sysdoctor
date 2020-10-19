import AppError from '@shared/errors/AppError';
import FakePersonRepository from '../repositories/fakes/FakePersonsRepository';
import CreatePersonService from './CreatePersonservice';

describe('CreatePerson', () => {
  it('should to be able create a new person', async () => {
    const fakePersonRepository = new FakePersonRepository();
    const createPerson = new CreatePersonService(fakePersonRepository);

    const person = await createPerson.execute({
      name: 'Jhon Doe',
      cpf: '000.000.000-00',
      birth: new Date(1980, 4, 8),
      cellPhone: '(61) 9 9999 9999',
      phone: '(61) 9999 9999',
      email: 'jhon@teste.com',
    });

    expect(person).toHaveProperty('id');
  });

  it('should not to be able create a two person with same cpf', async () => {
    const fakePersonRepository = new FakePersonRepository();
    const createPerson = new CreatePersonService(fakePersonRepository);

    await createPerson.execute({
      name: 'Jhon Doe',
      cpf: '000.000.000-00',
      birth: new Date(1980, 4, 8),
      cellPhone: '(61) 9 9999 9999',
      phone: '(61) 9999 9999',
      email: 'jhon@teste.com',
    });

    expect(
      createPerson.execute({
        name: 'Jhon Doe 2',
        cpf: '000.000.000-00',
        birth: new Date(1980, 10, 12),
        cellPhone: '(61) 9 9999 9999',
        phone: '(61) 9999 9999',
        email: 'jhon@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
