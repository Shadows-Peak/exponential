async function createNewAccount(username, password) {
  const response = await fetch('https://exponential-psi.vercel.app/api/makenewaccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
}
