import { v4 as uuid } from 'uuid';

import IProfilesRepository from '@modules/Users/repositories/IProfilesRepository';
import ICreateProfileDTO from '@modules/Users/dtos/ICreateProfileDTO';

import Profile from '../../infra/typeorm/entities/Profile';

class ProfilesRepository implements IProfilesRepository {
  private profiles: Profile[] = [];

  // create an Appointment
  public async create({ profile }: ICreateProfileDTO): Promise<Profile> {
    const profileSaved = new Profile();

    Object.assign(profileSaved, { id: uuid(), profile });

    this.profiles.push(profileSaved);

    return profileSaved;
  }

  public async save(profile: Profile): Promise<Profile> {
    const profileSaved = new Profile();

    Object.assign(profileSaved, profile);

    const indexprofile = this.profiles.findIndex(
      profileData => profileData.id === profileSaved.id,
    );

    this.profiles[indexprofile] = profileSaved;

    return profileSaved;
  }

  public findAll(): Promise<Profile[]> {
    return new Promise(() => this.profiles);
  }

  // filter appointment in especific date
  public async findByProfile(profile: string): Promise<Profile | undefined> {
    const findProfile = this.profiles.find(
      profileData => profileData.profile === profile,
    );

    return findProfile;
  }

  public async findById(id: string): Promise<Profile | undefined> {
    const findProfile = this.profiles.find(
      profileData => profileData.id === id,
    );

    return findProfile;
  }
}

export default ProfilesRepository;
