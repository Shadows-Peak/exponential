const API_KEY = 'patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933';
const BASE_ID = 'appXXbVu5p4uSKViT';
const TABLE_NAME = 'logins';
const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
async function fetchAirtableData() {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    const data = await response.json();
    alert(JSON.stringify(data, null , 2)); // Access your Airtable records here
    console.log(JSON.stringify(data, null , 2)); // Failed to load resource: the server responded with a status of 403 () -> {"error":{"type":"AUTHENTICATION_REQUIRED","message":"Authentication required"}}
    return data
}

fetchAirtableData();
