import { getRepository, Repository } from 'typeorm';
import IProfilesRepository from '@modules/Users/repositories/IProfilesRepository';
import ICreateProfileDTO from '@modules/Users/dtos/ICreateProfileDTO';
import Profile from '../entities/Profile';

class ProfilesRepository implements IProfilesRepository {
  private ormRepository: Repository<Profile>;

  constructor() {
    this.ormRepository = getRepository(Profile);
  }

  public async create(data: ICreateProfileDTO): Promise<Profile> {
    const profile = this.ormRepository.create(data);
    await this.ormRepository.save(profile);

    return profile;
  }

  public async save(profile: Profile): Promise<Profile> {
    return this.ormRepository.save(profile);
  }

  public async findAll(): Promise<Profile[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Profile | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByProfile(profile: string): Promise<Profile | undefined> {
    return this.ormRepository.findOne({ where: { profile } });
  }
}

export default ProfilesRepository;
