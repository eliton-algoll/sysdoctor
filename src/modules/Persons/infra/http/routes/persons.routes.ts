import { Router } from 'express';

import PersonsController from '../controllers/PersonsController';

const personsRouter = Router();
const personsController = new PersonsController();

// list all persons
personsRouter.get('/', personsController.index);

// create person
personsRouter.post('/', personsController.create);

// update person
personsRouter.put('/', personsController.update);

export default personsRouter;
