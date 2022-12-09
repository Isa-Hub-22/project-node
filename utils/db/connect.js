const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://root:1k6NEWRHPhslAuPu@moneyheist.alb4hxg.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
    console.log('Ejecuto el connect')
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connect;