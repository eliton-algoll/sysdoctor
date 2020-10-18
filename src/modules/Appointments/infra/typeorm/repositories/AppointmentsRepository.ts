import { getRepository, Repository } from 'typeorm';

// interfaces
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/Appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  // create an Appointment
  public async create({
    personId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ personId, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public findAll(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  // filter appointment in especific date
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return findAppointment || undefined;
  }
}

export default AppointmentsRepository;
