const express = require('express');
const router = express.Router();
const passport = require('passport');

//1 -- Render Login form
router.get('/login', (req, res) => res.render('login'));
//2 -- Handle login form submission
router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/'  
  })
);

//3 -- render register form
//4 -- handle register form submission

//5 -- Log out 

module.exports = router;