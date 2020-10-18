import { Router } from 'express';

import ProfilesController from '../controllers/ProfileController';

const profilesRouter = Router();
const profilesController = new ProfilesController();

profilesRouter.get('/', profilesController.index);

profilesRouter.post('/', profilesController.create);

profilesRouter.put('/', profilesController.update);

export default profilesRouter;
