import fetch from 'node-fetch';
import dotenv from 'dotenv';

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
        const response = await fetch('https://terabox-downloader-direct-download-link-generator.p.rapidapi.com/fetch', options);

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
