
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Imager = require('imager')
  , async = require('async')
  , _ = require('underscore')


exports.index = function(req, res)
{
	res.render('main', {user: req.user});
}