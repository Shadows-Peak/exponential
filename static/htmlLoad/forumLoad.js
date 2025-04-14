function displayPosts(postsArray) {
    const postsContainer = document.getElementById('post-list');
    if (!postsContainer) {
        console.error('Posts container not found');
        return;
    }
    postsContainer.innerHTML = ''; // Clear existing content
    if (!Array.isArray(postsArray) || postsArray.length === 0) {
        postsContainer.innerHTML = '<p>No posts available.</p>';
        return;
    }
    postsArray.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        const textElement = document.createElement('p');
        textElement.classList.add('post-text');
        textElement.textContent = post.fields.text;
        const usernameElement = document.createElement('p');
        usernameElement.classList.add('post-username');
        usernameElement.textContent = `- ${post.fields.username} || 'Anon'}`;
        postElement.appendChild(textElement);
        postElement.appendChild(usernameElement);
        postsContainer.appendChild(postElement);
    });
    console.log('Posts displayed successfully');
}
async function forumLoad() {
    // Fetch the forum HTML
    try {
        const response = await fetch('./templates/forum.html');
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
            displayPosts(posts);
            
            }
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
