import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;


dotenv.config();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Content-Type', 'application/json');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    };

    try {
        const response = await fetch('https://terabox-downloader-direct-download-link-generator2.p.rapidapi.com/url', options);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            return res.status(response.status).json({ error: 'Failed to fetch from RapidAPI', details: errorText });
        }

        const data = await response.json();
        if (data.length > 0 && data[0].dlink) {
            return res.status(200).json({ dlink: data[0].dlink });
        } else {
            return res.status(404).json({ error: 'No download link found' });
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/api/generate-link.js'));
});

app.listen(port, () => {
    console.log(`🚀 Express server is running on port ${port}`);
});

// Error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason, 'at', promise);
});

process.on('SIGINT', () => {
    saveData();
    process.exit();
});
