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
        posts.sort((a, b) => new Date(b.fields.Date) - new Date(a.fields.Date)); // Sort posts by date
        const postList = document.getElementById("post-list");
        async function updatePosts() {
            const posts = await loadPosts(); // Ensure loadPosts is defined and works correctly
            console.log('Posts:', JSON.stringify(posts, undefined, 2));
            posts.sort((a, b) => new Date(b.fields.Date) - new Date(a.fields.Date)); // Sort posts by date
            postList.innerHTML = ""; // Clear the current posts
            posts.forEach(post => {
            const postEl = document.createElement("div");
            postEl.classList.add("post");
            try {
                postEl.innerHTML = `
                    <div><strong>${post.username}</strong> <em>${new Date(post.fields.Date).toLocaleString()}</em></div>
                    <div>${post.fields.text}</div>
                    <hr>
                `;
            } catch (error) {
                console.error('Error rendering post:', error);
                postEl.innerHTML = `<div>Error loading post content.</div>`;
            }
            postList.appendChild(postEl);
            });
        }

        // Initial load of posts
        await updatePosts();

        // Set interval to update posts every minute
        setInterval(updatePosts, 60000);
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