import { json } from 'micro';

export default async function(req, res) {
  // Get the API key from environment variables
  const API_Key = process.env.API_KEY;
  
  // If API_KEY is not set, return a 500 error
  if (!API_Key) {
    return res.status(500).json({ message: "no API key :(" });
  }

  try {


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
    
    fetch("https://api.airtable.com/v0/appXXbVu5p4uSKViT/logins", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

  } catch (error) {
    // Catch any errors and log them
    console.error("Error creating account:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
