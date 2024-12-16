// you thought this was going to be easy, huh
export default async function(req, res) {
    const API_Key = process.env.API_KEY;
    if (!apiKey){
        return res.status(500).json({message: "no api key :("})
    }

    //logic :)
    /*
    const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + API_KEY);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "brw=brwtcGK1QAbqebbws; brwConsent=opt-in; AWSALBTG=ORWyx0GOeOeFC4Htx8qmUOyxTWMglIFRlmHSFCsHUGQjDt9U02Tsw6NZqNS6iaFy1dR7320woQicQisGMFqnU2DH0HrMtl+kfmVdeHCVa8iAkaYI1wBHVyDFizsxs748OPKKssThtiNNxJu3fme8XNO06csnnMzjj6kUDcXMt+qOHsxxHpo=; AWSALBTGCORS=ORWyx0GOeOeFC4Htx8qmUOyxTWMglIFRlmHSFCsHUGQjDt9U02Tsw6NZqNS6iaFy1dR7320woQicQisGMFqnU2DH0HrMtl+kfmVdeHCVa8iAkaYI1wBHVyDFizsxs748OPKKssThtiNNxJu3fme8XNO06csnnMzjj6kUDcXMt+qOHsxxHpo=");
const data = await json(req);
const username = data['username']
const password = data['password']
const raw = JSON.stringify({
  "records": [
    {
      "fields": {
        "username": username,
        "password": password
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
*/
    res.status(200).json({ message:'i gotchu boo'})
}