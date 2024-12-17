function createAccount(input){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "username": input['username'],
    "password": input['password']
  }, null, 2);

  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  console.log(raw)
  
  fetch("https://exponential-psi.vercel.app/api/make-account", requestOptions)
}