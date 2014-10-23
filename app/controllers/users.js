
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , check = require('validator').check
  , sanitize = require('validator').sanitize
  , twilio = require('../../config/middlewares/twilio')

exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/')
}

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login',
    message: req.flash('error')
  })
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  })
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  res.redirect('/login')
}

/**
 * Session
 */

exports.session = function (req, res) {
  res.redirect('/user/dashboard')
}

/**
 * Choose Plan
 */

exports.chooseplan = function (req, res) {
  res.render('users/chooseplan', {
    title: 'Choose Plan'
  })
}

/**
 * Who is it for
 */

exports.whoisitfor = function (req, res) {
  res.render('users/whoisitfor', {
    title: 'Who is it for'
  })
}

/**
 * Stats
 */

exports.stats = function (req, res) {
  res.render('users/stats', {
    title: 'Stats'
  })
}

/**
 * Picture
 */

exports.picture = function (req, res) {
  res.render('users/picture', {
    title: 'Setup Picture'
  })
}

/**
 * Zone
 */

exports.zone = function (req, res) {
  res.render('users/zone', {
    title: 'Setup Zone'
  })
}

/**
 * Route
 */

exports.route = function (req, res) {
  res.render('users/route', {
    title: 'Setup Route'
  })
}

/**
 * Contacts
 */

exports.contacts = function (req, res) {
  res.render('users/contacts', {
    title: 'Setup Contacts'
  })
}

/**
 * Create user HTTP POST
 */

exports.create = function (req, res) {
  var user = new User()
  user.mobile_number = req.param('mobile', '')
  user.password = req.param('pass', '')
  user.zip = req.param('zip', '')
  user.activation_code = Math.round(((new Date().valueOf()/1000) * Math.random())) + ''

  user.save(function (err) {
    if (err) {
      if(err.name == 'ValidationError')
      {
        return res.render('users/signup', { errors: err.errors, user: user })
      }else if(err.name == 'MongoError') {
        if(err.code == 11000) err.errors = [{type:'Mobile number already registered'}];

         return res.render('users/signup', { errors: err.errors, user: user })
      }      
    }

    //saved to db so lets send a sms to user
    twilio.sendSMS({to:'+1'+user.mobile_number.replace('-',''), activation:user.activation_code}, function(errs, result){
      if(errs) console.log(errs);    

      var encNumber = new Buffer(user.mobile_number).toString('base64');
      return res.redirect('/activate/'+encNumber);

    })

    
  })
}

/**
* Show Activation Window
**/

exports.activate = function(req, res){

  if(req.params.hasOwnProperty('phone'))
  {
    var clean_phone = sanitize(req.params.phone).xss();
    clean_phone = new Buffer(clean_phone, 'base64').toString('ascii');
    return res.render('users/activate', {phone:clean_phone, error:req.param('e')})
  }else{
    return res.render('users/activate');
  }  
}

/**
* HTTP POST
* Handles activation checking (AJAX request)
**/

exports.doactivation = function(req, res){
  var phone = req.param('mobile', false),
    code = req.param('code', false);

    if(phone && code)
    {
      var cb = function(err, user)
      {
        if(err || !user) return res.send({result:false});

        user.active = true;        

        user.save(function(er){
          if(er) res.send({result:false});
          res.send({result:true});
        })        
      }
      
      User.findOne({'mobile_number':phone, 'activation_code': code, 'active':false}, cb);

    }else{
      res.send({result:false});
    }


}

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.user
  res.render('users/show', {
    title: user.name,
    user: user
  })
}

/**
* HTTP POST
* Updates user with email and address
**/
exports.update = function(req, res){
  var phone = req.param('mobile', false),
    email = req.param('email', false),
    code = req.param('code', false),
    name = req.param('fullname', false);

    if(phone && email && name && code)
    {
        User.findOne({'mobile_number':phone, 'active':true, 'activation_code':code}, function(err, user){
            if(err || !user){
              return res.send('some db error');              
            }

           user.name = name;
           user.email = email;
           user.activation_code = '';
           user.save(function(){
            //success
             //login user            
             req.logIn(user, function(err) {
                //if (err) return next(err)
                return res.redirect('/user/dashboard')
              })
          })
            
        })
    }
}

exports.dashboard = function(req, res)
{
  var user = req.user
  res.render('users/dashboard', {user: user});
}

exports.resend = function(req, res){
  var mobile = req.param('mobile', false)
  var encNumber = new Buffer(mobile).toString('base64');
  User.findOne({'mobile_number':mobile, 'active':false}, function(err, user){
    if(err) return res.redirect('/activate/'+encNumber+'?e=404');
    if(!user) return res.redirect('/activate/'+encNumber+'?e=404');
    //@todo check with Client
    //should we generate a unique activation code? or just send out the same one?
    console.log(user);
    twilio.sendSMS({to:'+1'+user.mobile_number.replace('-',''), activation:user.activation_code}, function(errs, result){     
      return res.redirect('/activate/'+encNumber);
    })

  })
}



