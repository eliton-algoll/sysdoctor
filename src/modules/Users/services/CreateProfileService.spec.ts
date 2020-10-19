import AppError from '@shared/errors/AppError';

import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import CreateProfileService from './CreateProfileService';

describe('CreateProfile', () => {
  it('should be able to create a new Profile', async () => {
    const fakeProfilesRepository = new FakeProfilesRepository();
    const createProfile = new CreateProfileService(fakeProfilesRepository);

    const profile = await createProfile.execute({ profile: 'administrador' });

    expect(profile).toHaveProperty('id');
    expect(profile.profile).toBe('administrador');
  });

  it('should not be able to create two profiles on the same profile', async () => {
    const fakeProfilesRepository = new FakeProfilesRepository();
    const createProfile = new CreateProfileService(fakeProfilesRepository);

    await createProfile.execute({ profile: 'administrador' });

    expect(
      createProfile.execute({ profile: 'administrador' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
