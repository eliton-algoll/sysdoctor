import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      personId: 'personid',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.personId).toBe('personid');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      personId: 'personid',
      date: appointmentDate,
    });

    expect(
      createAppointment.execute({
        personId: 'personid',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
