const passport = require('passport');
const User = require('../../models/Users');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const createError = require('../erros/create-error');

//Crea una estrategia para autenticación de usuarios
passport.use(
    'register',
    new LocalStrategy (
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        }, 
        async (req, email, password, done) => {
           try {
                const previousUser = await User.findOne({email});   
                if (previousUser){
                    return done(createError('Este usuario ya existe , inicia sesión'));
                }

                const encPassword = await bcrypt.hash(password, 10);

                const newUser = new User({
                    email,
                    password: encPassword
                });
                const savedUser = await newUser.save();

                return done(null, savedUser);
             } catch (err){
            return done(err);
            }
        }
     )       
);
// Crea una estrategia en caso de login
passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                    const currentUser =  await User.findOne({ email});

                if(!currentUser){
                    return done(createError('Este email no existe, tienes que registrarte'));
                }

                const isValidPassword = await bcrypt.compare (
                    password,
                    currentUser.password
                );

                if (!isValidPassword) {
                    return done(createError('La contraseña es incorrecta'));
                }

                currentUser.password = null;
                return done(null, currentUser);
            } catch (err) {
                return done(err);
            }
            
            }

        )
    );
    // Registar el isuario por si id de la BD
    passport.serializeUser((user, done) => {
        return done (null, user._id);
    });
    // Busca un usario en función de su Id
    passport.deserializeUser(async(userId, done) => {
        try {
            const existingUser = await User.findById(userId);
            return done(null, existingUser);
        } catch (err){
            return done(err);
        }
    });