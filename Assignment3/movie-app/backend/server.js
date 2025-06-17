// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (local or Atlas)
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Mongoose schema
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    description: String,
    year: String,
    imageUrl: String,
    rating: String,
    genre: String,
    boxOffice: String,
    cast: String
}));

// API routes
app.get('/movies', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

app.post('/movies', async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
});

app.delete('/movies/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
