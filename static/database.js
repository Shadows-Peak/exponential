function createAccount(username, password){
  const data = {
    "username": username,
    "password": password
  };
  const requestOptions = {
    method: "POST",
    redirect: "follow"
  };
  
  fetch("https://exponential-psi.vercel.app/api/make-account", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}