import axios from "axios";

const API_URL = "https://doctero-api-onrender.onrender.com/api/v1";

/*
  Data tranformation
*/
const transformDoctor = (doctor) => {
  return {
    // doctorId: `#${
    //   doctor._id.slice(0, 2) +
    //   '...' +
    //   doctor._id.slice(-2, doctor._id.length)
    // }`,
    doctorId: `#${doctor._id}`,
    name: doctor?.name,
    experience: `${doctor?.experience}+ years` || "NA",
    fees: `₹${doctor?.fees}` || "NA",
  };
};

export async function createDoctor(newDoctor) {
  try {
    const res = await fetch(`${API_URL}/therapists`, {
      method: "POST",
      body: JSON.stringify(newDoctor),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || "Unknown error occured";
      console.error("Server error:", errorMessage);
      throw new Error(`${errorMessage}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

export async function getAllDoctors(specialization) {
  try {
    const data = await axios.get(
      `${API_URL}/therapists?specialization=${specialization}`
    );
    let doctors = data.data.data.therapists;

    // Trasform for table
    doctors = doctors.map(transformDoctor);
    return doctors;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export async function getDoctor(id) {
  try {
    if (id) {
      const idValue = id.slice(1, id.length);

      const data = await axios.get(`${API_URL}/therapists/${idValue}`);
      let doctor = data.data.data.therapist;
      
      const reviewsData = await axios.get(`${API_URL}/feedbacks/${idValue}`);

      doctor = {...doctor, feedbacks: reviewsData.data.data.feedbacks}

      // Trasform for table
      return doctor;
    }
    else return null;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}
