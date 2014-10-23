
var mongoose = require('mongoose')
  //, Article = mongoose.model('Article')
  , User = mongoose.model('User')
  , async = require('async')
  , https = require('https')
  , querystring = require('querystring');
  

module.exports = function (app, passport, auth) {


  // user routes
  var users = require('../app/controllers/users')
  app.get('/signup', users.signup)
  app.post('/signup', users.create)
  app.get('/activate', users.activate)
  app.get('/activate/:phone', users.activate)
  app.post('/doactivation', users.doactivation)
  app.post('/user/update', users.update)
  app.post('/user/resend', users.resend)
  app.get('/user/show', users.show)
  app.get('/user/dashboard', auth.requiresLogin, users.dashboard)
  app.get('/login', users.login)
  app.get('/logout', users.logout)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/user/chooseplan', users.chooseplan)
  app.post('/user/whoisitfor', users.whoisitfor)
  app.post('/user/stats', users.stats)
  app.post('/user/picture', users.picture)
  app.post('/user/zone', users.zone)
  app.post('/user/route', users.route)
  app.post('/user/contacts', users.contacts)
	  
  /*
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/:userId', users.show)
 
  app.param('userId', users.user)
*/




  var lassy = require('../app/controllers/lassy')
    // home route
  app.get('/', lassy.index)
  /*
  app.get('/signup', users.signup)
  app.post('/signup', users.create)
  app.get('/activate', users.activate)
  app.get('/activate/:phone', users.activate)
  app.post('/doactivation', users.doactivation)
  app.post('/user/update', users.update)

  app.get('/user/dashboard', users.dashboard)
  */
}
