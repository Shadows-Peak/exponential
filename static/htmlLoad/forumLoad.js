async function forumLoad() {
    try {
        // Fetch the forum HTML
        const response = await fetch('./templates/forum.html');
        if (!response.ok) {
            console.error('Failed to fetch forum.html:', response.status, response.statusText);
            throw new Error('Failed to fetch forum.html');
        }
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
        postList.innerHTML = ""; // Clear the current posts
        posts.forEach(post => {
            const postEl = document.createElement("div");
            postEl.classList.add("post");
            postEl.innerHTML = `
                <div><strong>${post.username}</strong> <em>${new Date(post.fields.Date).toLocaleString()}</em></div>
                <div>${post.fields.text}</div>
                <hr>
            `;
            postList.appendChild(postEl);
        });

    } catch (error) {
        console.error('Error loading forum.html:', error);
        alert('Error loading forum page. Please try again later.');
    }
}
window.forumLoad = forumLoad;
