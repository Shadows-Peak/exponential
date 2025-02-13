async function signUp(username, password) {
  const apiKey = "patkkZrsUMphPMHSV.e0f6dc672fa00f478e351863f853c0e027cb425e5572b6c5806e207b26affa8f"
  const baseId = "appXXbVu5p4uSKViT"
  const tableName = "logins"
  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`
  const data = {
      "records": [
          {
              "fields": {
                  "username": username,
                  "password": password
              }
          }
      ]
  }
  try {
      const response = await fetch(url, {
          method: "POST",
          headers: {
              authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      })
      return response.json()
      

}   catch (error) {
      console.error("Error signing up:", error)
      return null
  }  
}
// Expose the function globally so main.js can use it.
window.signUp = signUp;
