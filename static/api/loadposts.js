async function loadPosts() {
    const apiKey = "pat1nzJn2F4xz0rsu.467092737c986118748036d5a4414629242d4f789ac77b4e012c7a0dfa641152"; // Your read-only API key
    const baseId = "appum0pcb1Bu3mY6L";       //Airtable Base ID
    const tableName = "le chat";             //table name
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
            });
            const data = await response.json();
            // Check if the data contains records
            if (data.records && data.records.length > 0) {
                // Map the records to extract the fields
                return data.records.map(record => ({
                    id: record.id,
                    ...record.fields
                }));
            }
        } catch (error) {
            console.error("Error loading posts:", error);
            return null;
        }
    }
// Expose the function globally so main.js can use it.
window.loadPosts = loadPosts;

