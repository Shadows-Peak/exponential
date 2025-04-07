async function getUserByUsername(username) {
    console.log("Fetching user by username:", username);
    // Ensure the username is provided.
    const apiKey = "pat1nzJn2F4xz0rsu.467092737c986118748036d5a4414629242d4f789ac77b4e012c7a0dfa641152"; // Your read-only API key
    const baseId = "appum0pcb1Bu3mY6L";       //Airtable Base ID
    const tableName = "logins";               //table name
    // Use filterByFormula to search for the given username.
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={username}='${username}'`;
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        if (data.records.length > 0) {
            // Return the first matching record (includes fields.username and fields.password)
            return data.records[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}