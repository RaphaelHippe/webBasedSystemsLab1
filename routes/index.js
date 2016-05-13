var express = require('express');
var router = express.Router();
var myTagging = require('./../public/javascripts/tagging.js');
var myLocation = require('./../public/javascripts/location.js');
var redisservice = require('./../public/javascripts/redis.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/tagging', function(req, res, next) {
  var options = {
    title: 'Geo Location Tagging'
  };
  res.render('tagging', options);
});

router.post('/geodata', function(req, res, next) {
  var myObj = new myLocation(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag);
  redisservice.save(myObj, function(err, index) {
    redisservice.query(function(err, data) {
      var options = {
        title: 'Geo Location Discovery',
        locations: []
      };
      for (var i = 0; i < data.length; i++) {
        options.locations.push(JSON.parse(data[i]));
      }
      res.render('discovery', options);
    });
  });
});

/* GET discovery page. */
router.get('/discovery', function(req, res, next) {
  redisservice.query(function(err, data) {
    var options = {
      title: 'Geo Location Discovery',
      locations: []
    };
    for (var i = 0; i < data.length; i++) {
      options.locations.push(JSON.parse(data[i]));
    }
    res.render('discovery', options);
  });
});

router.post('/discovery/search', function(req, res, next) {
  redisservice.get(req.body.search, function (err, data) {
    var options = {
      title: 'Geo Location Discovery',
      locations: [JSON.parse(data)]
    };
    res.render('discovery', options);
  });
});

router.delete('/discovery/delete', function(req, res, next) {
  redisservice.del(req.body.name, function(err, amount) {
    redisservice.query(function(err, data) {
      var options = {
        title: 'Geo Location Discovery',
        locations: []
      };
      for (var i = 0; i < data.length; i++) {
        console.log(i, data[i]);
        options.locations.push(JSON.parse(data[i]));
      }
      console.log('options.locations', options.locations);
      res.render('discovery', options);
    });
  });
});

module.exports = router;
