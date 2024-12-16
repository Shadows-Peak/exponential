function createAccount(input){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "username": input['username'],
    "password": input['password']
  });
  
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("https://exponential-psi.vercel.app/api/make-account", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}