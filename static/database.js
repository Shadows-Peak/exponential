async function createNewAccount(username, password) {
  const response = await fetch('https://dlie2.netlify.app/.netlify/functions/hello-world', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:{ "username":username, "password":password },
  })
  .then(responce => responce.json);

  const data = await response.json();
  alert(data)
}
