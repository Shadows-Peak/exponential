async function forumLoad() {
    // Fetch the forum HTML
    try {
        const response = await fetch('/templates/forum.html');
        const html = await response.text();

        // Parse the HTML and replace body content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;
        const themeStylesheet = document.getElementById("mainStylesheet");
        themeStylesheet.setAttribute('href', './static/forum_styles.css')
        // Load posts from Airtable
        try {
            const posts = await loadPosts();
            console.log('Posts:', JSON.stringify(posts, undefined, 2));

            // Get the post list container
            posts = posts.map(post => ({
                username: post.fields.username,
                fields: {
                    text: post.fields.text,
                    Date: post.fields.Date
                }
            }));
            const postList = document.getElementById("post-list");
            if (!postList) {
                console.error("post-list element not found.");
                return;
            }

            // Clear the current posts
            postList.innerHTML = "";

            // Render each post
            posts.forEach(post => {
                if (!post.username || !post.fields.text) {
                    console.warn("Invalid post data:", post);
                    return;
                }

                const postEl = document.createElement("div");
                postEl.classList.add("post");
                postEl.innerHTML = `
                    <div>
                        <strong>${post.username}</strong>
                        <em>${new Date(post.fields.Date).toLocaleString()}</em>
                    </div>
                    <div>${post.fields.text}</div>
                    <hr>
                `;
                postList.appendChild(postEl);
            });
        } catch (error) {
            console.error('Error loading posts:', error);
            alert('Error loading posts. Please try again later.');
        }
    } catch (error) {
        console.error('Error loading forum.html:', error);
        alert('Error loading forum page. Please try again later.');
    }
}
// Expose the function globally
window.forumLoad = forumLoad;
