import axios from 'axios';
import { transformDate } from '../utilities/transformDate';

const API_URL = 'https://doctero-api-onrender.onrender.com/api/v1';

const transformPatient = (patient) => {
  patient = patient.patient;

  return {
    patientId: `#${
      patient._id.slice(0, 4) +
      '...' +
      patient._id.slice(-4, patient._id.length)
    }`,
    name: patient?.name,
    gender: patient?.gender || "Not specified",
    problem: `${patient?.problem?.length ? patient.problem : 'No problem spcified'}`,
    date: `${transformDate(patient?.activeTill, 21)}`,
    contact: `${patient?.contact.phone}`,
  };
};

export async function createPatient(newPatient) {
  try {
    const res = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      body: JSON.stringify(newPatient),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Unknown error occured';
      console.error('Server error:', errorMessage);
      throw new Error(`${errorMessage}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    alert(err.message);
  }
}

export async function getPatientsForDoctor({doctor, span}) {
  try {
    const data = await axios.get(`${API_URL}/therapists/patients/${doctor}?sortBy=date&sortOrder=desc&dateRange=${span}`);

    const patients = data.data.data.uniquePatients;
    const tablePatients = patients.map(transformPatient);
    return tablePatients;
  } catch (err) {
    console.error(err);
  }
}
