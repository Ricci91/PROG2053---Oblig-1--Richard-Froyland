document.addEventListener("DOMContentLoaded", function() {
    var postContainer = document.getElementById('main-container'); // Where the posts will be added
    var postCount = 0;
    var isLoading = false;
    var initialLimit = 15; // Number of posts to load first
    var postsPerScroll = 3; // How many posts to load when scrolling

    // Function to add posts to the page
    function addPostsToPage(posts) {
        var i = postCount + 1;
        posts.forEach(function(post) {
            var article = document.createElement("article");
            var title = document.createElement("h1");
            title.textContent = post.title;
            var body = document.createElement("p");
            body.textContent = post.body;
            article.appendChild(title);
            article.appendChild(body);
            postContainer.appendChild(article);

            // Add clearfix after every 3 posts for layout
            if (i % 3 === 0) {
                var clearfix = document.createElement("div");
                clearfix.setAttribute("class", "clearfix");
                postContainer.appendChild(clearfix);
            }
            i++;
        });
    }

    // Function to fetch posts
    function getPosts(limit) {
        if (isLoading) return; // Don't fetch if already fetching
        isLoading = true;

        fetch("https://jsonplaceholder.typicode.com/posts?_start=" + postCount + "&_limit=" + limit)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Error with the status: " + response.status);
                }
                return response.json();
            })
            .then(function(posts) {
                addPostsToPage(posts); // Add fetched posts to the page
                postCount += posts.length;
            })
            .catch(function(error) {
                console.log("Error fetching posts:", error);
            })
            .finally(function() {
                isLoading = false; // Finished fetching
            });
    }

    // Function to check if we need to load more posts (when scrolling)
    function onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
            getPosts(postsPerScroll);
        }
    }

    // Load initial posts
    getPosts(initialLimit);

    // Listen for scrolling to load more posts
    window.addEventListener('scroll', onScroll);
});
