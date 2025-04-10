async function syncData(username, password, data) {
    const apiKey = "patQrnmo4Rx7UEXzj.070130fcd48d6bdfaf5a4a9ad9e67debc785ef5badeae5825ed3ce7a58c57675"
    const baseId = "appum0pcb1Bu3mY6L"
    const tableName = "logins"
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`
    localStorage.getItem("username")
    localStorage.getItem("password")
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    };

    // Fetch records to find the matching username
    const response = await fetch(`${url}?filterByFormula={username}='${username}'`, { headers });
    const result = await response.json();

    if (result.records.length === 0) {
        throw new Error("Username not found");
    }

    const record = result.records[0];
    const recordId = record.id;

    // Verify the password
    if (record.fields.password !== hashPassword(password)) {
        throw new Error("Invalid password");
    }

    // Append the new data to the existing "data" field
    const updatedData = Array.isArray(record.fields.data) ? [...record.fields.data, data] : [data];

    // Update the record
    await fetch(`${url}/${recordId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
            fields: {
                data: updatedData
            }
        })
    });
}