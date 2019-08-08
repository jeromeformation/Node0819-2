// Les imports
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
// Parse du corps de la requête
const bodyParser = require('body-parser');

// Connexion à Mongo
mongoose.connect('mongodb://localhost/catalogue',{ useNewUrlParser: true })
    .then(
        () => console.log('Connexion Mongo OK !'),
        (err) => {
          throw new Error(err.message)
        }
    )
;

console.log(mongoose.connection);

// Les imports de routage
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let recipeRouter = require('./routes/recipe');

// Création de l'application
let app = express();

// Moteur de templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Les midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Les midlewares de routage
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recettes', recipeRouter);

// Gestion de l'erreur 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Gestion des erreurs (générique)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
