document.addEventListener("DOMContentLoaded", function() {
    let postContainer = document.getElementById('post-container');
    let postCount = 0;
    let isLoading = false;
    
    // Function to create a new post element
    function createPostElement(post) {
        const article = document.createElement('article');
        article.innerHTML = `
            <h1>${post.title}</h1>
            <p>${post.body}</p>
        `;
        return article;
    }

    // Function to fetch posts from the API
    async function fetchPosts() {
        if (isLoading) return;
        isLoading = true;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${postCount}&_limit=3`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            const posts = await response.json();

            posts.forEach(post => {
                const postElement = createPostElement(post);
                postContainer.appendChild(postElement);
            });

            postCount += 3;
        } catch (error) {
            console.error("Error fetching posts: ", error);
        } finally {
            isLoading = false;
            checkScrollAndFetchMore();
        }
    }

    // Function to check if the page is scrollable and fetch more if not
    function checkScrollAndFetchMore() {
        if (document.body.offsetHeight <= window.innerHeight) {
            fetchPosts(); // Fetch more posts if the content doesn't fill the screen
        }
    }

    // Scroll event listener to load more posts when scrolling near the bottom
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
            fetchPosts();
        }
    });

    // Automatically load posts when the page loads
    fetchPosts();
});
