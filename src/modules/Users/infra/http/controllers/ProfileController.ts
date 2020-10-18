import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ProfilesRepository from '@modules/Users/infra/typeorm/repositories/ProfilesRepository';
import CreateProfileService from '@modules/Users/services/CreateProfileService';
import UpdateProfileService from '@modules/Users/services/UpdateProfileService';

class ProfileController {
  async index(request: Request, response: Response): Promise<Response> {
    const profilesRepository = new ProfilesRepository();
    const profiles = await profilesRepository.findAll();

    return response.json(profiles);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { profile } = request.body;

    const createProfile = container.resolve(CreateProfileService);

    const profileSaved = await createProfile.execute({ profile });

    return response.json(profileSaved);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, profile } = request.body;

    const saveProfile = container.resolve(UpdateProfileService);

    const profileSaved = await saveProfile.execute({ id, profile });

    return response.json(profileSaved);
  }
}

export default ProfileController;
