var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const Google = require('passport-github').Strategy;
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect(`mongodb+srv://kmueller:066981408@cluster0-bu7ln.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to Mongodb'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session for persistent authentication
app.use(
  session({
  secret: 'lkjflajdlfkjsdjdjiennicewpjfiije',
  resave: false,
  saveUninitialized: true
  })
);
app.use(passport.initialize()); //Initialize passport first
app.use(passport.session()); //use passport with session

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

passport.use(
  new GithubStrategy(
    {
      clientID: '13a5a8e7509caafc51b9',
      clientSecret: '0cb4f558339d90c3b819d660d0f024a7828be317',
      callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOne({ githubId: profile.id }, function(err, user) {
        if (!err && !user) {
          const newgithub = new User(profile);
          newgithub.save();
          return cb(null, newgithub);
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

//user static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
