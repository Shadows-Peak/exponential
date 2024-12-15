const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933");
myHeaders.append("Cookie", "brw=brwtcGK1QAbqebbws; brwConsent=opt-in; AWSALBTG=jxag47/tC1Fkw2Yl/l2+Jqwucby7OsAjd1D5qCTkf+gFRFWSc/+zaZ8o6AfMR/8hmqk0GhB2ZCIhOD1ErlVWdeZB43VvJcid+oll+ZIEYWeUvQS4dc+xlFxsKM6jnKvjadHV+AfMYp6cXRLAl4WYlpzPHRatzhR0BK16LWk/vU3t8VTO6W0=; AWSALBTGCORS=jxag47/tC1Fkw2Yl/l2+Jqwucby7OsAjd1D5qCTkf+gFRFWSc/+zaZ8o6AfMR/8hmqk0GhB2ZCIhOD1ErlVWdeZB43VvJcid+oll+ZIEYWeUvQS4dc+xlFxsKM6jnKvjadHV+AfMYp6cXRLAl4WYlpzPHRatzhR0BK16LWk/vU3t8VTO6W0=");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.airtable.com/v0/appXXbVu5p4uSKViT/logins", requestOptions) //Logs Whole Dataset to console, defo delete later
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

function newUser(username, password){
  const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "brw=brwtcGK1QAbqebbws; AWSALBTG=jxag47/tC1Fkw2Yl/l2+Jqwucby7OsAjd1D5qCTkf+gFRFWSc/+zaZ8o6AfMR/8hmqk0GhB2ZCIhOD1ErlVWdeZB43VvJcid+oll+ZIEYWeUvQS4dc+xlFxsKM6jnKvjadHV+AfMYp6cXRLAl4WYlpzPHRatzhR0BK16LWk/vU3t8VTO6W0=; AWSALBTGCORS=jxag47/tC1Fkw2Yl/l2+Jqwucby7OsAjd1D5qCTkf+gFRFWSc/+zaZ8o6AfMR/8hmqk0GhB2ZCIhOD1ErlVWdeZB43VvJcid+oll+ZIEYWeUvQS4dc+xlFxsKM6jnKvjadHV+AfMYp6cXRLAl4WYlpzPHRatzhR0BK16LWk/vU3t8VTO6W0=");

const raw = JSON.stringify({
  "records": [
    {
      "id": "recQ5avqTXPU9tKqz",
      "createdTime": "2024-12-13T17:15:47.000Z",
      "fields": {
        "Username": "input_username",
        "Password": "input_password"
      }
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.airtable.com/v0/appXXbVu5p4uSKViT/logins", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
newUser(ryker,test123);