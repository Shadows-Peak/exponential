async function finddata() {
  const records = await fetchAllRecords();
  if (records) {
    console.log("All records fetched:");
    console.log(JSON.stringify(records, null, 2));
  } else {
    console.log("Failed to get Records");
  }
}

finddata();
