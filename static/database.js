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
    const data = JSON.stringify((await response.json()) , null , 2)
    return data
}
var data = fetchAirtableData();
data.then(result => {
}).catch(error => {
    console.error('Error fetching data:', error);
});

// Function to get all usernames and passwords
function getAllUsernamesAndPasswords(data) {
  return data.records.map(record => ({
    username: record.fields.Username,
    password: record.fields.Password
  }));
}
// Function to find a password by username
function findPasswordByUsername(data, username) {
  const record = data.records.find(record => record.fields.Username === username);
  return record ? record.fields.Password : 'Username not found';
}
const ALL_USERS = getAllUsernamesAndPasswords(data)
console.log(ALL_USERS)
console.log(findPasswordByUsername(data, 'Very-Secure-Username.gov'))

