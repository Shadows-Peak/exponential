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

function signUp(username, password) {
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "brw=brwtcGK1QAbqebbws; brwConsent=opt-in; AWSALBTG=z4COSHPbhfi7K6uqLA6xEnsDj9rbXEsx3M5ksFM11HO6GK3A9THk3WS/ykqfNLwOh3gSywt23xP3HYRId5/AO472pOPIT2CFKmFtfyboF0MwAFaEgM9HIfi1cZBmLVYX2St6spI5xMYqLFYWzARAaGOJB4niy5yQIdfLaAwQql4hTh3TuPo=; AWSALBTGCORS=z4COSHPbhfi7K6uqLA6xEnsDj9rbXEsx3M5ksFM11HO6GK3A9THk3WS/ykqfNLwOh3gSywt23xP3HYRId5/AO472pOPIT2CFKmFtfyboF0MwAFaEgM9HIfi1cZBmLVYX2St6spI5xMYqLFYWzARAaGOJB4niy5yQIdfLaAwQql4hTh3TuPo=");

const raw = JSON.stringify({
  "records": [
    {
      "fields": {
        "Username": username,
        "Password": password
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