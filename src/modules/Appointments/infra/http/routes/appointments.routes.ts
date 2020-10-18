import { Router } from 'express';

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// list all appointments
appointmentsRouter.get('/', appointmentsController.index);

// create appointment
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
