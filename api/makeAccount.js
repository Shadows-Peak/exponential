import { json } from 'micro';

export default async function(req, res) {
  // Get the API key from environment variables
  const API_Key = process.env.API_KEY;
  
  // If API_KEY is not set, return a 500 error
  if (!API_Key) {
    return res.status(500).json({ message: "no API key :(" });
  }

  try {


    // Set up headers for the Airtable API request
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_Key}`);
    myHeaders.append("Content-Type", "application/json");

    // Prepare the data to be sent to Airtable
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

    // Request options for the fetch call
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    // Make the request to Airtable and wait for the response
    const response = await fetch("https://api.airtable.com/v0/appXXbVu5p4uSKViT/logins", requestOptions);

    // Check if the response was successful
    if (!response.ok) {
      // If the response status is not OK, return an error
      const errorData = await response.json();
      return res.status(response.status).json({ message: errorData.error.message });
    }

    // Parse the response from Airtable (if needed)
    const result = await response.json();
    console.log("Airtable response:", result);

    // Return a success response
    return res.status(200).json({ message: 'Account created successfully', data: result });

  } catch (error) {
    // Catch any errors and log them
    console.error("Error creating account:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
