import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/Appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  // create an Appointment
  public async create({
    personId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, personId });

    this.appointments.push(appointment);

    return appointment;
  }

  public findAll(): Promise<Appointment[]> {
    return new Promise(() => this.appointments);
  }

  // filter appointment in especific date
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }
}

export default AppointmentsRepository;
