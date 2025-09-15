const NEWS_API_KEY = 'YOUR_NEWSAPI_KEY'; // Replace with your NewsAPI.org key

async function fetchNews(query, containerId) {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`;
    const container = document.getElementById(containerId);
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

// Fetch both Wikipedia and Google News sections
fetchNews('space OR astronomy OR discovery OR NASA OR ISRO OR aerospace', 'wikipedia-news');
fetchNews('aerospace OR rocket OR satellite OR space mission', 'google-news');