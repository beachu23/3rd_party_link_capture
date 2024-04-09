document.getElementById('search_form').addEventListener('submit', function(event) {
    event.preventDefault();
    const domain = document.getElementById('searchterm').value.trim();
    const keywords = ["sustainability", "recycling", "emissions", "renewable", "green"];
    let allLinks = new Set(); // Use a set to avoid duplicates

    const searchPromises = keywords.map(keyword => {
        // Update the query to exclude specific domains
        const query = `${domain} ${keyword} -site:${domain} -site:wikipedia.org -site:facebook.com -site:instagram.com -site:reddit.com -site:quora.com -site:youtube.com -site:linkedin.com -site:tiktok.com -site:amazon.com -site:pinterest.com`;
        return fetch('/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(data => {
            // Proceed as before
            const newLinks = data.webPages?.value.map(page => page.url) || [];
            newLinks.forEach(link => {
                if (!link.includes(domain)) { // Further ensure domain isn't included
                    allLinks.add(link);
                }
            });
        });
    });
    

    Promise.all(searchPromises).then(() => {
        // Convert set to array and take the first 25 results
        displayResults(Array.from(allLinks).slice(0, 25));
    })
    .catch(error => {
        console.error('Error:', error);
        displayResults([]);
    });
});

function displayResults(links) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = ''; // Clear previous results
    links.forEach(link => {
        const li = document.createElement('li');
        li.textContent = link;
        resultsElement.appendChild(li);
    });
}
