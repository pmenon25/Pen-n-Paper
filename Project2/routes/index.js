var express = require('express');
var router = express.Router();
const passport = require('passport');


/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('/user');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: "select_account"
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/user/show',
    failureRedirect: '/user'
  }
));

router.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/user');
});

module.exports = router;
