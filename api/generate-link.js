import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// API Handler for the /generate-link POST route
app.post('/generate-link', async (req, res) => {
    // Log the request method and body for debugging
    console.log('Received request:', req.method);
    console.log('Request body:', req.body);

    if (req.method !== 'POST') {
        console.log('Method not allowed');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { url } = req.body;
    if (!url) {
        console.log('URL parameter missing');
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    };

    try {
        console.log('Making request to RapidAPI...');
        const response = await fetch('https://terabox-downloader-direct-download-link-generator2.p.rapidapi.com/url', options);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            return res.status(response.status).json({ error: 'Failed to fetch from RapidAPI', details: errorText });
        }

        const data = await response.json();
        console.log('Received response from RapidAPI:', data);

        if (data.length > 0 && data[0].dlink) {
            console.log('Download link found:', data[0].dlink);
            return res.status(200).json({ dlink: data[0].dlink });
        } else {
            console.log('No download link found');
            return res.status(404).json({ error: 'No download link found' });
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// Listen on the Heroku-defined port or 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
