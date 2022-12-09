const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        director: String,
        year: Number,
        genre: String,
        picture: String
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;