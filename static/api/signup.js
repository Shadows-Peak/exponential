async function signUp(username, password) {
    console.log("Signing up user:", username);
    const apiKey = "patQrnmo4Rx7UEXzj.070130fcd48d6bdfaf5a4a9ad9e67debc785ef5badeae5825ed3ce7a58c57675"
    const baseId = "appum0pcb1Bu3mY6L"
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