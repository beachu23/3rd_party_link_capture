document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search_form').addEventListener('submit', function(event) {
        event.preventDefault();

        let companyUrl = document.getElementById('company_url').value.trim();
        const companyName = document.getElementById('company_name').value.trim();

        
        if (!companyUrl.match(/^http[s]?:\/\//)) {
            companyUrl = 'https://' + companyUrl;
        }

        const keywords = ["sustainability", "recycling", "emissions", "renewable", "green"];
        let allLinks = new Set(); // Use a set to avoid duplicates

        const searchPromises = keywords.map(keyword => {
            const domain = new URL(companyUrl).hostname;
            const query = `${companyName} ${keyword} -site:${domain} -site:wikipedia.org -site:facebook.com -site:instagram.com -site:reddit.com -site:quora.com -site:youtube.com -site:linkedin.com -site:tiktok.com -site:amazon.com -site:pinterest.com`;
            return fetch('/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            })
            .then(response => response.json())
            .then(data => {
                const newLinks = data.webPages?.value.map(page => page.url) || [];
                newLinks.forEach(link => {
                    if (!link.includes(domain)) { 
                        allLinks.add(link);
                    }
                });
            });
        });

        Promise.all(searchPromises).then(() => {
            displayResults(Array.from(allLinks).slice(0, 25));
        })
        .catch(error => {
            console.error('Error:', error);
            displayResults([]);
        });
    });

    function displayResults(links) {
        const resultsElement = document.getElementById('results');
        resultsElement.innerHTML = '';
        links.forEach(link => {
            const li = document.createElement('li');
            li.textContent = link;
            resultsElement.appendChild(li);
        });
    }
});
