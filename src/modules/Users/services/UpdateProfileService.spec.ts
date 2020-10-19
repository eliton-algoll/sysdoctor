import AppError from '@shared/errors/AppError';

import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import CreateProfileService from './CreateProfileService';
import UpdateProfileService from './UpdateProfileService';

describe('UpdateProfile', () => {
  it('should be able update profile', async () => {
    const fakeProfilesRepository = new FakeProfilesRepository();
    const createProfile = new CreateProfileService(fakeProfilesRepository);
    const updateProfile = new UpdateProfileService(fakeProfilesRepository);

    const profile = await createProfile.execute({ profile: 'administrador' });

    const profileUpdated = await updateProfile.execute({
      id: profile.id,
      profile: 'administrador editado',
    });

    expect(profileUpdated.profile).toBe('administrador editado');
  });

  it('should not be able update non existing profile', async () => {
    const fakeProfilesRepository = new FakeProfilesRepository();
    const updateProfile = new UpdateProfileService(fakeProfilesRepository);

    expect(
      updateProfile.execute({
        id: '321',
        profile: 'administrador',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
