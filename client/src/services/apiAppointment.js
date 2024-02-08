import axios from "axios";
import moment from "moment";
const API_URL = "https://doctero-api-onrender.onrender.com/api/v1";

/*
  Get
*/
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
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&sortBy=date&sortOrder=desc&dateRange=Today`
    );
    const dataRemote = await axios.get(
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&type=Remote&sortBy=date&sortOrder=desc&dateRange=Today`
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

    const allAppointments =
      moment(appointment.date) > moment(appointmentRemote.date)
        ? appointmentRemote
        : appointment;
    return allAppointments;
  } catch (err) {
    console.error(err);
  }
}

export async function getAppointment(appointmentId) {
  if (appointmentId) {
    try {
      const data = await axios.get(`${API_URL}/appointments/${appointmentId}`);

      return data.data.data.appointment;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }
}

export async function getTodayRemoteAppointentsForDoctor({ doctor }) {
  try {
    const dataRemote = await axios.get(
      `${API_URL}/therapists/appointments/${doctor}?limit=10000&type=Remote&sortBy=startTime&sortOrder=desc&dateRange=Today`
    );

    const appointmentsRemote = dataRemote.data.data.appointments;

    return appointmentsRemote;
  } catch (err) {
    console.error(err);
  }
}

export async function getTodayRemoteAppointentsForPatient({ patient }) {
  try {
    const dataRemote = await axios.get(
      `${API_URL}/patients/appointments/${patient}?limit=10000&type=Remote&sortBy=startTime&sortOrder=desc&dateRange=Today`
    );

    const appointmentsRemote = dataRemote.data.data.appointments;

    return appointmentsRemote;
  } catch (err) {
    console.error(err);
  }
}

export async function getLiveAppointmentForDoctor({doctor}) {
  const startTime = moment().hour();

  try {
    const data = await axios.get(
      `${API_URL}/therapists/liveAppointment/${doctor}/${startTime}`
    );

    const appointmentsRemote = data.data.data.appointments?.[0];

    return appointmentsRemote;
  } catch (err) {
    console.error(err);
  }
}

export async function getLiveAppointmentForPatient({patient}) {
  const startTime = moment().hour();

  try {
    const data = await axios.get(
      `${API_URL}/patients/liveAppointment/${patient}/${startTime}`
    );

    const appointmentsRemote = data.data.data.appointments?.[0];

    return appointmentsRemote;
  } catch (err) {
    console.error(err);
  }
}

/*
  Create
*/
export async function createAppointment(appointment) {
  try {
    const data = await axios.post(`${API_URL}/appointments`, appointment);

    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}
