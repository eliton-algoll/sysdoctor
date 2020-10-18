import { Router } from 'express';

import AuthenticationService from '../services/AuthenticationService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const authenticate = new AuthenticationService();

  const { user, token } = await authenticate.execute({ username, password });

  return response.json({ user, token });
});

export default sessionRouter;
