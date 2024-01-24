import axios from "axios";
const API_URL = 'http://127.0.0.1:8000/api/v1';

export async function getAppointentsForDoctor({doctor, span}) {
    try {
      const data = await axios.get(`${API_URL}/therapists/appointments/${doctor}?limit=10000&sortBy=date&sortOrder=desc`);
      const dataRemote = await axios.get(`${API_URL}/therapists/appointments/${doctor}?limit=10000&type=Remote&sortBy=date&sortOrder=desc`);
        
      // api/v1/therapists/appointments/656434a39c2ec9617e124254?dateRange=Month&sortBy=date&sortOrder=asc
      const appointments = data.data.data.appointments;
      const appointmentsRemote = dataRemote.data.data.appointments;
        
      const allAppointments = [...appointments, ...appointmentsRemote]
      return allAppointments;
    } catch (err) {
      console.error(err);
    }
  }