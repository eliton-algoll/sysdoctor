import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfilesRepository from '@modules/Users/repositories/IProfilesRepository';
import Profile from '../infra/typeorm/entities/Profile';

interface IrequestDTO {
  profile: string;
}

@injectable()
class CreateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ profile }: IrequestDTO): Promise<Profile> {
    // checking if user exists
    const userProfile = await this.profilesRepository.findByProfile(profile);

    if (userProfile) {
      throw new AppError('Profile already exists');
    }

    const profileSaved = this.profilesRepository.create({
      profile,
    });

    return profileSaved;
  }
}

export default CreateProfileService;
