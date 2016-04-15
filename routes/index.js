var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tagging', function (req, res, next) {
  var options = {
    title: 'Geo Location Tagging'
  };
  res.render('tagging', options);
});

/* GET discovery page. */
router.get('/discovery', function(req, res, next) {
var options = {
 title : 'Geo Location Discovery',
 locations : [ {
 lat : 49.013790,
 long : 8.404435,
 name : 'castle',
 hash : '#sight'
 }, {
 lat : 49.013790,
 long : 8.390071,
 name : 'iwi',
 hash : '#edu'
 } ]
 };
 res.render('discovery', options);
});

module.exports = router;
