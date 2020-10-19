import { container } from 'tsyringe';

import '@modules/Users/providers';

import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';

import ProfilesRepository from '@modules/Users/infra/typeorm/repositories/ProfilesRepository';
import IProfilesRepository from '@modules/Users/repositories/IProfilesRepository';

import PersonsRepository from '@modules/Persons/infra/typeorm/repositories/PersonsRepository';
import IPersonsRepository from '@modules/Persons/repositories/IPersonsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProfilesRepository>(
  'ProfilesRepository',
  ProfilesRepository,
);

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
);
