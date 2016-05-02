var express = require('express');
var router = express.Router();
var myTagging = require('./../public/javascripts/tagging.js');

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

router.post('/geodata', function (req, res, next) {
  myTagging.addTag(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag);
  var options = {
    title: 'Geo Location Discovery',
    locations: myTagging.getData()
  }
  res.render('discovery', options);
});

/* GET discovery page. */
router.get('/discovery', function(req, res, next) {
var options = {
 title : 'Geo Location Discovery',
 locations : myTagging.getData()
 };
 res.render('discovery', options);
});

router.post('/discovery/search', function (req, res, next) {
  var options = {
    title: 'Geo Location Discovery: Searched by:' + req.body.search,
    locations: myTagging.search(req.body.search)
  }
  res.render('discovery', options);
});

router.delete('/discovery/delete', function (req, res, next) {
  var options = {
    title: 'Geo Location Discovery: deleted Element:' + req.body.index,
    locations: myTagging.deleteByIndex(req.body.index)
  }
  console.log('d3', options.locations);
  res.render('discovery', options);
});


module.exports = router;
