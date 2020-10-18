import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AuthenticationService from '@modules/Users/services/AuthenticationService';

class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticate = container.resolve(AuthenticationService);

    const { user, token } = await authenticate.execute({ username, password });

    return response.json({ user, token });
  }
}

export default SessionsController;
