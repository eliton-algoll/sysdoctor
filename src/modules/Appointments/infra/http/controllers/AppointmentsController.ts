import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';

class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();

    const appointments = await appointmentsRepository.findAll();

    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { personId, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      personId,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
