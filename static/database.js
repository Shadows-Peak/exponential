const Airtable = require('airtable'); // Ensure Airtable is imported

const API_KEY = 'patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933';
const BASE_ID = 'appXXbVu5p4uSKViT';
const TABLE_NAME = 'logins';

// Initialize the Airtable client
const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);
const table = base(TABLE_NAME);

async function fetchAllRecords() {
  console.log("Starting fetchAllRecords...");
  try {
    let allRecords = [];
    await table.select().eachPage((records, fetchNextPage) => {
      console.log("Fetched a page of records");
      records.forEach(record => {
        console.log("Processing record:", record);
        allRecords.push(record.fields); // Record.fields contains record data
      });
      fetchNextPage();
    });
    console.log("All records fetched successfully");
    return allRecords;
  } catch (err) {
    console.error("Error fetching records:", err);
    return undefined;
  }
}

async function finddata() {
  console.log("Calling fetchAllRecords...");
  const records = await fetchAllRecords();
  if (records) {
    console.log("All records fetched:");
    console.log(JSON.stringify(records, null, 2));
  } else {
    console.log("Failed to get Records");
  }
}

finddata();
