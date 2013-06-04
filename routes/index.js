(function (exports) {
  "use strict";
  var mongoose = require('mongoose')
    , crudUtils = require('../utils/crudUtils')
    , post = mongoose.model('Post')
    , users = require('../app/controller/users')

  function index(req, res) {
    res.render('index', { 
        'title': 'Bulletin Board Demo'
        , 'username':(req.user) ?  req.user.username: undefined
        , 'userid':(req.user) ?  req.user._id: undefined
      });
  }
  exports.init = function (app, auth, passport) {
    app.get('/',index);
    app.get('/login', users.login);
    app.get('/signup', users.signup);
    app.get('/logout', users.logout)
    app.post('/users', users.create)
 
    app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/login' }), users.signin)
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), users.authCallback)
    app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/login' }), users.signin)
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), users.authCallback)

    app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), users.session)
    crudUtils.initRoutesForModel({ 'app': app, 'model': post, auth: auth });
  };
}(exports));