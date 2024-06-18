const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let collection;

async function connectToDatabase() {
    try {
        await client.connect();
        const db = client.db('sybil');
        collection = db.collection('sybil');
        console.log('Connected to MongoDB');
        
        // Start the server after successful connection to the database
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

connectToDatabase();

app.use(cors());

app.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        if (!collection) {
            return res.status(500).send('Database connection not established');
        }

        const results = await collection.find({ Line: query }).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
