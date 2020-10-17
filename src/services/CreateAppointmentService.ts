import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  doctor: string;

  date: Date;
}

class CreateAppointmentService {
  public async execute({ doctor, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      doctor,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;