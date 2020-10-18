import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfilesRepository from '@modules/Users/repositories/IProfilesRepository';
import Profile from '../infra/typeorm/entities/Profile';

interface IrequestDTO {
  id: string;
  profile: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ id, profile }: IrequestDTO): Promise<Profile> {
    const profileSave = await this.profilesRepository.findById(id);

    if (!profileSave) {
      throw new AppError('Profile not found', 404);
    }

    const profileSaved = this.profilesRepository.save({
      ...profileSave,
      profile,
    });

    return profileSaved;
  }
}

export default UpdateProfileService;
