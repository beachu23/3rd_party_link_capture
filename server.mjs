import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 8000;
const count = 5;

app.use(express.json());
app.use(express.static('public'));

app.post('/search', async (req, res) => {
    const query = req.body.query; 
    const subscriptionKey = 'f118f483930349cf9cdc7fefee61c900';
    const endpoint = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}&count=${count}`;
    try {
        const apiResponse = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        });
        const apiResponseJson = await apiResponse.json();
        res.json(apiResponseJson); 
    } catch (error) {
        console.error('Error calling the Bing Search API', error);
        res.status(500).send('An error occurred'); 
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




