async function forumLoad() {
    try {
        // Fetch the forum HTML
        const response = await fetch('./templates/forum.html');
        const html = await response.text();

        // Parse the HTML and replace body content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;

        // Load posts from Airtable
        const posts = await loadPosts(); // Ensure loadPosts is defined and works correctly
        console.log('Posts:', JSON.stringify(posts, undefined, 2));
        

        // Handle stylesheet dynamically
        let link = document.getElementById("mainStyleSheet");
        if (!link) {
            // Create the stylesheet link if it doesn't exist
            link = document.createElement("link");
            link.id = "mainStyleSheet";
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
        link.href = "./static/forum.css";
    } catch (error) {
        console.error('Error loading forum.html:', error);
        alert('Error loading forum page. Please try again later.');
    }
}
window.forumLoad = forumLoad;