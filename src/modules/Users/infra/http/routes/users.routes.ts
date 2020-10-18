import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const userRouter = Router();
const usersController = new UsersController();

// list all users
userRouter.get('/', usersController.index);

// create one user
userRouter.post('/', usersController.create);

export default userRouter;
