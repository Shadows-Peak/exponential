const API_KEY = 'patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933';
const BASE_ID = 'appXXbVu5p4uSKViT';
const TABLE_NAME = 'logins';
/*
const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
async function fetchAirtableData() {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    const data = await response.json()
    return data
}
var data = fetchAirtableData();
alert(JSON.stringify(data))
data.then(result => {
}).catch(error => {
    console.error('Error fetching data:', error);
});
const Airtable = require('airtable');
const dotenv = require('dotenv');
dotenv.config();
*/


// Initialize the Airtable client
const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);
const table = base(TABLE_NAME);

async function fetchAllRecords() {
  try {
    let allRecords = [];
    await table.select().eachPage((records, fetchNextPage) => {
        // This function will get called for each page of records.
      records.forEach(record => {
        allRecords.push(record.fields); // Record.fields contains record data
      });
      fetchNextPage();
    });
    return allRecords
    }
    catch (err) {
        console.error(err)
        return undefined;
    }
}
async function finddata() {
  const records = await fetchAllRecords();
    if (records) {
        console.log("All records fetched:");
        console.log(JSON.stringify(records, null, 2))
    }
    else {
        console.log("Failed to get Records")
    }
}

finddata();
