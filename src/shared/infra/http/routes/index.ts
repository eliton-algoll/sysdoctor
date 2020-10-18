import { Router } from 'express';
import appointmentsRouter from '@modules/Appointments/infra/http/routes/appointments.routes';
import personsRouter from '@modules/Persons/infra/http/routes/persons.routes';
import usersRouter from '@modules/Users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/Users/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/Users/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/persons', personsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profiles', profilesRouter);

export default routes;
