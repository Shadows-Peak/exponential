export default async function handler(req, res) {
    try {
      // Retrieve the API Key from environment variables
      const API_Key = process.env.API_KEY;
  
      // Check if the API Key is set
      if (!API_Key) {
        return res.status(500).json({ message: "API Key is not set in environment variables!" });
      }
  
      // Return the API Key in the response (for testing purposes)
      return res.status(200).json({ apiKey: API_Key });
    } catch (error) {
      // Catch any other errors and return a detailed error message
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
  