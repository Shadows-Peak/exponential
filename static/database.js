async function createAccount(username, password) {
  const response = await fetch('https://exponential-psi.vercel.app/api/makeAccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log('Login successful:', data);
  } else {
    console.log('Login failed:', data.message);
  }
}