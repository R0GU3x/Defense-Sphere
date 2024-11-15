document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});

async function fetchNews() {
    try {
        const response = await fetch('/articles/data');
        const data = await response.json();
        
        console.log('Fetched data:', data);
        
        if (data.articles && data.articles.length > 0) {
            // Update hero section with the latest article
            updateHeroSection(data.articles[0]);
            
            // Update grid with remaining articles
            updateNewsGrid(data.articles.slice(1));
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        showErrorMessage();
    }
}

function updateHeroSection(article) {
    document.getElementById('hero-title').textContent = article.title;
    document.getElementById('hero-description').textContent = article.description;
    document.getElementById('hero-date').textContent = formatDate(article.publishedAt);
    document.getElementById('hero-link').href = article.url;
}

function updateNewsGrid(articles) {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = ''; // Clear loading spinner
    
    articles.forEach(article => {
        const articleCard = createArticleCard(article);
        grid.appendChild(articleCard);
    });
}

function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    
    card.innerHTML = `
        <img src="${article.urlToImage || '/static/images/article-not-found.jpg'}" 
             alt="${article.title}"
             onerror="this.src='/static/images/article-not-found.jpg'">
        <div class="article-content">
            <span class="article-category" style="color: #afafaf">Cybersecurity News</span>
            <h3 style="color: #c0009c;">${article.title}</h3>
            <p>${article.description || 'Click to read more about this story.'}</p>
            <a href="${article.url}" class="read-more" target="_blank">Continue Reading</a>
        </div>
    `;
    
    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function showErrorMessage() {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = `
        <div class="error-message">
            <p>Sorry, we couldn't load the latest news. Please try again later.</p>
        </div>
    `;
}