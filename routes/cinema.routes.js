const express = require('express');
const Cinema = require('../models/Cinema.js');

const cinemaRouter = express.Router();

cinemaRouter.get('/', async (req, res, next) => {
    try {
        const cinema = await Cinema.find().populate('movies');
        return res.status(200).json(cinema);
    } catch (err){
        next(err);
    }
});

cinemaRouter.post('/', async (req, res, next) => {
    try {
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies:[]
        });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (err){
        next(err);  
    }
});

cinemaRouter.put('/add-movie', async (req, res, next) =>{
    try {
        const { cinemaId, movieId } = req.body;
        if (!cinemaId){
            return next(createError('Se necesita un id de cinema para añadir la película', 500));
        }
        if(!movieId){
            return next (createError('Se necesita un id de movie para añadirlo', 500)); 
        }
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            {$push: { movies: movieId} },
            {new: true }
        );
        return res.status(200).json(updatedCinema);
    } catch (err){
        return next (err);
    }
});

cinemaRouter.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const modifiedCinema = new Cinema({...req.body});
        modifiedCinema._id = id;
        const cinemaUpdate = await Cinema.findByIdAndUpdate(
            id,
            { $set: {...modifiedCinema}},
            {new:true}

        );
        return res.status(200) .json(cinemaUpdate);
    } catch (err){
        next (err);
    }
});

cinemaRouter.delete('/:id', async (req, res, next) => {
    
    try {
        const id = req.params.id;
        await Cinema.findByIdAndDelete(id);
        return res.status(200).json('El cine ha sido eleminado correctamente');
    } catch (err) {
        next(err);
    }
});

module.exports = cinemaRouter;