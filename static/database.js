function createAccount(username, password){
  const data = {
    "username": username,
    "password": password
  };
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow"
  };
  
  fetch("https://exponential-psi.vercel.app/api/make-account", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}