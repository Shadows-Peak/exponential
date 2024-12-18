async function uploadLoginData(username, password) {
  try {
    const response = await fetch('https://exponential-psi.vercel.app/api/makenewaccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Success:', data);
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
