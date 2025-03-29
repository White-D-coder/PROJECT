async function fetchWikipediaArticles() {
    const query = "Aerospace";
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const articles = data.query.search;
        const wikiContainer = document.getElementById("wikipedia-news");

        articles.forEach(article => {
            const articleLink = `https://en.wikipedia.org/wiki/${article.title.replace(/ /g, "_")}`;
            const articleElement = document.createElement("div");
            articleElement.innerHTML = `
                <h3><a href="${articleLink}" target="_blank">${article.title}</a></h3>
                <p>${article.snippet}...</p>
            `;
            wikiContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error("Error fetching Wikipedia articles:", error);
    }
}

async function fetchGoogleNews() {
    const apiKey = "YOUR_GOOGLE_API_KEY";
    const cx = "YOUR_CUSTOM_SEARCH_ENGINE_ID";
    const query = "Aerospace news";
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = data.items;
        const googleContainer = document.getElementById("google-news");

        items.forEach(item => {
            const newsElement = document.createElement("div");
            newsElement.innerHTML = `
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                <p>${item.snippet}</p>
            `;
            googleContainer.appendChild(newsElement);
        });
    } catch (error) {
        console.error("Error fetching Google news:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchWikipediaArticles();
    fetchGoogleNews();
});