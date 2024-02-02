const API_URL = 'https://doctero-api-onrender.onrender.com/api/v1';

export async function updateUser(updatedUser) {
  const userId = updatedUser._id;

  try {
    const res = await fetch(`${API_URL}/auth/onboard/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Unknown error occured';
      console.error('Server error: ', errorMessage);
      throw new Error(`${errorMessage}`);
    }

    const data = await res.json();
    return data.data.user;
  } catch (err) {
    alert(err.message);
  }
}
