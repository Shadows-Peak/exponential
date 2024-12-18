function createAccount(input){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = {
    "username": input['username'],
    "password": input['password']
  };

  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  console.log(raw)
  alert(raw)
  fetch("https://exponential-psi.vercel.app/api/make-account", requestOptions)
}
