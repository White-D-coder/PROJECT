const NEWS_API_KEY = 'cb681be3bf03450f9b7249c86e0cedf1'; // Replace with your NewsAPI.org or GNews key

async function fetchNews(query, containerId, fromDate = null, clear = false) {
    let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`;
    if (fromDate) {
        url += `&from=${fromDate}`;
    }

    const container = document.getElementById(containerId);
    if (clear) container.innerHTML = ""; // clear previous results for fresh search
    container.innerHTML = '<p>Loading...</p>';

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.articles && data.articles.length) {
            container.innerHTML = data.articles.map(article => `
                <div class="news-article">
                    <a href="${article.url}" target="_blank"><strong>${article.title}</strong></a>
                    <p>${article.description || ''}</p>
                    <small>${new Date(article.publishedAt).toLocaleString()}</small>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>No news found.</p>';
        }
    } catch (e) {
        container.innerHTML = '<p>Failed to fetch news.</p>';
    }
}

// Load today's news by default
function loadDefaultNews() {
    // Show news from the last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    fetchNews('space OR astronomy OR discovery OR NASA OR ISRO OR aerospace', 'wikipedia-news', sevenDaysAgo, true);
    fetchNews('aerospace OR rocket OR satellite OR space mission', 'google-news', sevenDaysAgo, true);
}

// Search handler
document.addEventListener('DOMContentLoaded', function () {
    loadDefaultNews();

    const form = document.getElementById('news-search-form');
    const input = document.getElementById('news-search-input');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const value = input.value.trim();
        let dateMatch = value.match(/^(\d{4}-\d{2}-\d{2})$/);

        if (dateMatch) {
            // Search by date
            fetchNews('space OR astronomy OR discovery OR NASA OR ISRO OR aerospace', 'wikipedia-news', dateMatch[1], true);
            fetchNews('aerospace OR rocket OR satellite OR space mission', 'google-news', dateMatch[1], true);
        } else if (value.length > 0) {
            // Search by keyword
            fetchNews(value, 'wikipedia-news', null, true);
            fetchNews(value, 'google-news', null, true);
        } else {
            // If input empty → reload default
            loadDefaultNews();
        }
    });
});
