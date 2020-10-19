import AppError from '@shared/errors/AppError';
import FakePersonRepository from '../repositories/fakes/FakePersonsRepository';
import CreatePersonService from './CreatePersonservice';
import UpdatePersonService from './UpdatePersonService';

describe('CreatePerson', () => {
  it('should to be able update a person', async () => {
    const fakePersonRepository = new FakePersonRepository();
    const createPerson = new CreatePersonService(fakePersonRepository);

    const updatePerson = new UpdatePersonService(fakePersonRepository);

    const person = await createPerson.execute({
      name: 'Jhon Doe',
      cpf: '000.000.000-00',
      birth: new Date(1980, 4, 8),
      cellPhone: '(61) 9 9999 9999',
      phone: '(61) 9999 9999',
      email: 'jhon@teste.com',
    });

    const updatedPerson = await updatePerson.execute({
      id: person.id,
      name: 'Jhon Doe edit',
      cpf: '000.000.000-00',
      birth: new Date(1985, 4, 8),
      cellPhone: '(61) 9 9999 9999',
      phone: '(61) 9999 9999',
      email: 'jhon@teste.com',
    });

    expect(updatedPerson.name).toBe('Jhon Doe edit');
  });

  it('should to be able update a person with new cpf', async () => {
    const fakePersonRepository = new FakePersonRepository();
    const createPerson = new CreatePersonService(fakePersonRepository);

    const updatePerson = new UpdatePersonService(fakePersonRepository);

    const person = await createPerson.execute({
      name: 'Jhon Doe',
      cpf: '000.000.000-00',
      birth: new Date(1980, 4, 8),
      cellPhone: '(61) 9 9999 9999',
      phone: '(61) 9999 9999',
      email: 'jhon@teste.com',
    });

    const updatedPerson = await updatePerson.execute({
      id: person.id,
      name: 'Jhon Doe edit',
      cpf: '999.999.999-99',
      birth: new Date(1985, 4, 8),
      cellPhone: '(61) 9 9999 9999',
      phone: '(61) 9999 9999',
      email: 'jhon@teste.com',
    });

    expect(updatedPerson.name).toBe('Jhon Doe edit');
  });

  it('should not to be able update a person with an new existing cpf', async () => {
    const fakePersonRepository = new FakePersonRepository();
    const createPerson = new CreatePersonService(fakePersonRepository);

    const updatePerson = new UpdatePersonService(fakePersonRepository);

    await createPerson.execute({
      name: 'Jhon Doe',
      cpf: '000.000.000-00',
      birth: new Date(1980, 4, 8),
      cellPhone: '(61) 9 9999 9999',
      phone: '(61) 9999 9999',
      email: 'jhon@teste.com',
    });

    const person = await createPerson.execute({
      name: 'Jhon Doe 2',
      cpf: '999.999.999-00',
      birth: new Date(1985, 10, 20),
      cellPhone: '(61) 9 8888 9999',
      phone: '(61) 9999 8888',
      email: 'jhondoe2@teste.com',
    });

    expect(
      updatePerson.execute({
        id: person.id,
        name: 'Jhon Doe 2 edit',
        cpf: '000.000.000-00',
        birth: new Date(1996, 4, 8),
        cellPhone: '(61) 9 9999 9999',
        phone: '(61) 9999 9999',
        email: 'jhon@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able update a non existing person', async () => {
    const fakePersonRepository = new FakePersonRepository();

    const updatePerson = new UpdatePersonService(fakePersonRepository);

    expect(
      updatePerson.execute({
        id: '123456789',
        name: 'Jhon Doe edit',
        cpf: '000.000.000-00',
        birth: new Date(1985, 4, 8),
        cellPhone: '(61) 9 9999 9999',
        phone: '(61) 9999 9999',
        email: 'jhon@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
