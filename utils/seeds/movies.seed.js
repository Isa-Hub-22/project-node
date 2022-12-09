const mongoose = require ('mongoose');
const Movie = require('../../models/Movies.js');
const fs = require('fs');

const DB_URL = "mongodb+srv://root:1k6NEWRHPhslAuPu@moneyheist.alb4hxg.mongodb.net/?retryWrites=true&w=majority";

 mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }) .then(async () => {
        const allMovies = await Movie.find();

        if(allMovies.length){
            await Movie.collection.drop();
        }
    }) .catch(err => {
        console.log(`Ha habido un error elimando los datos: ${err}`);
    })
    .then(async () => {
       const data = fs.readFileSync('./utils/seeds/db/movies.json');

            const parsedData = JSON.parse(data);
            const movieDocs = parsedData.map((movie) =>{
                return new Movie(movie);
            });
            await Movie.insertMany(movieDocs);
        })
        .catch((err) => {
            console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
        })
        .finally(() => mongoose.disconnect());
    