/*const {GristDocAPI} = require('grist-api');

// Put here the URL of your document.
const DOC_URL = "https://docs.getgrist.com/9KC8xj6xEYzA/docs";
new GristDocAPI(DOC_URL, {apiKey: 'd398ddbce150c59c00a039c76b4bd24d6e35ba5b'})
async function main() {
  const api = new GristDocAPI(DOC_URL);
  // Add some rows to a table
  await api.addRecords('Food', [
    {Name: 'eggs', AmountToBuy: 12},
    {Name: 'beets', AmountToBuy: 1},
  ]);

  // Fetch all rows.
  const data = await api.fetchTable('Food');
  alert(data);

  // Sync data by a key column.
  await api.syncTable('Food', [{Name: 'eggs', AmountToBuy: 0}], ['Name']);
}
*/

const {GristDocAPI} = require('grist-api');