const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true,

        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'El email no tiene un formato válido']
        
    },
    password: {type: String, required: true},
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;