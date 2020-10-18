import Profile from '../infra/typeorm/entities/Profile';

import ICreateProfileDTO from '../dtos/ICreateProfileDTO';

interface IProfilesRepository {
  create(data: ICreateProfileDTO): Promise<Profile>;

  save(profile: Profile): Promise<Profile>;

  findAll(): Promise<Profile[]>;

  findById(id: string): Promise<Profile | undefined>;

  findByProfile(profile: string): Promise<Profile | undefined>;
}

export default IProfilesRepository;
