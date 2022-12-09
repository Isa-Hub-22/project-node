const express = require('express');
const Movie = require('../models/Movies.js');
const createError = require('../utils/erros/create-error.js');
const isAuthPassport = require('../utils/middlewares/auth-passport.middleware.js');
const upload = require('../utils/middlewares/image.middleware.js');

const moviesRouter = express.Router();

moviesRouter.get('/', [isAuthPassport], async (req, res, next) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
});

moviesRouter.get('/:id', [isAuthPassport], async (req, res, next) => {
    const id = req.params.id;
    try {
        const movies = await Movie.findById(id);
        if (movies){
            return res.status(200).json(movies);
        } else {
            next(createError('No existe una película con el id indicado', 404));
        }
        
    } catch (err) {
        next(err);
    }
});

moviesRouter.get('/title/:title', async (req, res, next) => {
    const title = req.params.title;
    try {
        const movies = await Movie.find({ title
        });
               
            return res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
});

moviesRouter.get('/genre/:genre', async (req, res, next) => {
    const genre = req.params.genre;
    try {
        const movies = await Movie.find({ genre
        });
               
            return res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
});

moviesRouter.get('/year/:year', async (req, res, next) => {
    const genre = req.params.year;
    try {
        const movies = await Movie.find({ year: {$gt: 2010}
        });
               
            return res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
});
//Upload ( multer) tiene dos modos:
//  -single: para subir un archivo
// -array: para subir varios archivos(nombre del campo, nº de archivos)

moviesRouter.post('/', [upload.single('picture')] ,async (req, res, next) => {
    try {
        const picture = req.file ? req.file.filename : null;
        const newMovie = new Movie({...req.body, picture });
        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie);
    } catch (err) {
        next(err);
    }
});

moviesRouter.delete('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('La película ha sido eliminada correctamente');
} catch(err){
    next(err);
}
});

moviesRouter.delete('/title/:title', async (req, res, next) => {
    const title = req.params.title;
    try {
        const title = req.params.title;
        await Movie.deleteOne({title});
        return res.status(200).json('La película ha sido eleminada correctamente');
    } catch (err) {
        next(err);
    }
});

moviesRouter.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const modifiedMovie = new Movie({...req.body});
        modifiedMovie._id = id;
        const movieUpdate = await Movie.findByIdAndUpdate(
            id,
            {$set: {...modifiedMovie}},
            {new:true}

        );
        return res.status(200) .json(movieUpdate);
    } catch (err){
        next (err);
    }
});


module.exports = moviesRouter;