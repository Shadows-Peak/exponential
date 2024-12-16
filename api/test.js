  // Retrieve the API key from environment variables
  const API_KEY = process.env.API_KEY;

  // Check if the API key exists
  if (!API_KEY) {
    return res.status(500).json({ message: "API key is missing" });
  }

  // Send the API key as the response
  return res.status(200).json({ api_key: API_KEY });
}