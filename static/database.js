const API_KEY = 'patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933';
const BASE_ID = 'your_base_id';
const TABLE_NAME = 'your_table_name';
const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
async function fetchAirtableData() {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    const data = await response.json();
    console.log(data.records); // Access your Airtable records here
}

fetchAirtableData();
