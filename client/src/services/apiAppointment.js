import axios from "axios";
import moment from "moment"
const API_URL = "http://127.0.0.1:8000/api/v1";

export async function getAppointentsForDoctor({ doctor, span }) {
  try {
    const data = await axios.get(
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&sortBy=date&sortOrder=desc`
    );
    const dataRemote = await axios.get(
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&type=Remote&sortBy=date&sortOrder=desc`
    );

    // api/v1/therapists/appointments/656434a39c2ec9617e124254?dateRange=Month&sortBy=date&sortOrder=asc
    const appointments = data.data.data.appointments;
    const appointmentsRemote = dataRemote.data.data.appointments;

    const allAppointments = [...appointments, ...appointmentsRemote];
    return allAppointments;
  } catch (err) {
    console.error(err);
  }
}

export async function getTodayAppointentsForDoctor({ doctor }) {
  try {
    const data = await axios.get(
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&sortBy=date&sortOrder=asc&dateRange=Today`
    );
    const dataRemote = await axios.get(
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&type=Remote&sortBy=date&sortOrder=asc&dateRange=Today`
    );

    const appointments = data.data.data.appointments;
    const appointmentsRemote = dataRemote.data.data.appointments;

    const allAppointments = [...appointments, ...appointmentsRemote];
    return allAppointments;
  } catch (err) {
    console.error(err);
  }
}

export async function getCustomDayAppointmentsForDoctor({ doctor, day }) {
  try {
    const data = await axios.get(
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&sortBy=date&sortOrder=asc&dateRange=${day}`
    );
    const dataRemote = await axios.get(
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&type=Remote&sortBy=date&sortOrder=asc&dateRange=${day}`
    );

    const appointments = data.data.data.appointments;
    const appointmentsRemote = dataRemote.data.data.appointments;

    const allAppointments = [...appointments, ...appointmentsRemote];
    return allAppointments;
  } catch (err) {
    console.error(err);
  }
}

export async function getFirstAppointentsForDoctor({ doctor, patient }) {
  try {
    const data = await axios.get(
      `${API_URL}/therapists/patientFirstAppointment/65abc396ba545a47c0464388?patientId=65afbf511750d5d8bde59dc9`
    );
    const dataRemote = await axios.get(
      `${API_URL}/therapists/patientFirstAppointment/65abc396ba545a47c0464388?patientId=65afbf511750d5d8bde59dc9&type=Remote`
    );

    // api/v1/therapists/appointments/656434a39c2ec9617e124254?dateRange=Month&sortBy=date&sortOrder=asc
    const appointment = data.data.data.earliestAppointment;
    const appointmentRemote = dataRemote.data.data.earliestAppointment;

    const allAppointments = moment(appointment.date) > moment(appointmentRemote.date) ? appointmentRemote : appointment;
    return allAppointments;
  } catch (err) {
    console.error(err);
  }
}

export async function createAppointment(appointment) {
  try {
    const data = await axios.post(`${API_URL}/appointments`, appointment);

    return data.data;
  } catch(err) {
    console.error(err);
    throw new Error(err.message);
  }
}
