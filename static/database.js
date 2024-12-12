const {GristDocAPI} = require('grist-api');
const DOC_URL = "https://docs.getgrist.com/9KC8xj6xEYzA/docs";
const API_KEY = "d398ddbce150c59c00a039c76b4bd24d6e35ba5b"
const api = new GristDocAPI(GristDocAPI);
new GristDocAPI(DOC_URL, {apiKey: API_KEY})
function get_pass(username) {
    api.fetchTable(Table1)

}
const output = api.fetchTable(Table1);
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('version').innerHTML = "version " + (output) + ".";
});