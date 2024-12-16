export default async function handler(req, res) {
    try {
      // Retrieve the API Key from environment variables
      const API_Key = process.env.API_KEY;
        
      // Check if the API Key is set
    if (!API_Key) {
        return res.status(500).json({ message: "API Key is not set in environment variables!" });
      }
      // Set up headers for the Airtable API request
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_Key}`);
    myHeaders.append("Content-Type", "application/json");

    // Prepare the data to be sent to Airtable
    const raw = JSON.stringify({
      "records": [
        {
          "fields": {
            "username": "username",
            "password": "password"
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
      // Return the API Key in the response (for testing purposes)
      return res.status(200).json({ apiKey: API_Key });
    } catch (error) {
      // Catch any other errors and return a detailed error message
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
      
    }

  }
  