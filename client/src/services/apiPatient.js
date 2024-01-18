import { onboard } from '../features/auth';
import store from '../store';

const API_URL = 'http://127.0.0.1:8000/api/v1';

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
