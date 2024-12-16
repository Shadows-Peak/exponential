import { json } from 'micro';

export default async function(req, res) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "brw=brwtcGK1QAbqebbws; brwConsent=opt-in; AWSALBTG=05EdyotyuE+/rdSRD+10ASSNIr4LQdBvhypgba7SRyIq6cCVn45d0C5PTOl4+YKC1Hnlwc54PGBe7HgSJgGxdN3cRVah/j9XrB5C1ij6VhI43rR4M1N6oNyPbRGfJgs3S6P9T8Uk7kp/w2mKtoJ0VboBl90PkhRaOkgxlC0cwkeUgseipug=; AWSALBTGCORS=05EdyotyuE+/rdSRD+10ASSNIr4LQdBvhypgba7SRyIq6cCVn45d0C5PTOl4+YKC1Hnlwc54PGBe7HgSJgGxdN3cRVah/j9XrB5C1ij6VhI43rR4M1N6oNyPbRGfJgs3S6P9T8Uk7kp/w2mKtoJ0VboBl90PkhRaOkgxlC0cwkeUgseipug=");
    
    const raw = JSON.stringify({
      "records": [
        {
          "fields": {
            "username": "username123",
            "password": "37t83t2"
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
    
    await fetch("https://api.airtable.com/v0/appXXbVu5p4uSKViT/logins", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}
