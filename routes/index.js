var express = require('express');
var router = express.Router();
var myTagging = require('./../public/javascripts/tagging.js');
var myLocation = require('./../public/javascripts/location.js');
var redisservice = require('./../public/javascripts/redis.js');

router.post('/geotags/search', function(req, res, next) {
  redisservice.get(req.body.search, function(err, data) {
    var options = {
      title: 'Geo Location Discovery',
      locations: [JSON.parse(data)]
    };
    res.render('discovery', options);
  });
});

router.get('/tagging', function(req, res, next) {
  var options = {
    title: 'Geo Location Tagging'
  };
  res.render('tagging', options);
});

// RESTFUL

// geotags
// POST
// GET
router.post('/geotags', function(req, res, next) {
  var myObj = new myLocation(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag);
  redisservice.save(myObj, function(err, index) {
    if (err) {
      res.sendStatus(409);
    } else {
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
    }
  });
});
router.get('/geotags', function(req, res, next) {
  redisservice.query(function(err, data) {
    var options = {
      title: 'Geo Location Discovery',
      locations: []
    };
    if (err === null) {
      for (var i = 0; i < data.length; i++) {
        options.locations.push(JSON.parse(data[i]));
      }
    }
    res.render('discovery', options);
  });
});
// geotags/:name
// GET
// PUT
// DELETE
router.get('/geotags/:name', function(req, res, next) {
  redisservice.get(req.params.name, function(err, data) {
    if (err) {
      res.sendStatus(404);
    }
    var options = {
      title: 'Geo Location Discovery',
      locations: []
    };
    options.locations.push(JSON.parse(data));
    res.render('discovery', options);
  });
});
router.put('/geotags/:name', function(req, res, next) {
  redisservice.update(req.params.name, req.body, function(err, data) {
    if (err) {
      res.sendStatus(404);
    }
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
router.delete('/geotags/:name', function(req, res, next) {
  redisservice.del(req.params.name, function(err, amount) {
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

// as a service - without templates

router.post('/api/geotags', function(req, res, next) {
  var myObj = new myLocation(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag);
  redisservice.save(myObj, function(err, index) {
    if (err) {
      res.sendStatus(409);
    } else {
      redisservice.get(myObj.name, function(err, data) {
        if (err) {
          res.sendStatus(err);
        } else {
          res.send(JSON.parse(data));
        }
      });
    }
  });
});
router.get('/api/geotags', function(req, res, next) {
  redisservice.query(function(err, data) {
    if (err) {
      res.sendStatus(err);
    } else {
      var myData = [];
      for (var i = 0; i < data.length; i++) {
        myData.push(JSON.parse(data[i]));
      }
      res.send(myData);
    }
  });
});
// geotags/:name
// GET
// PUT
// DELETE
router.get('/api/geotags/:name', function(req, res, next) {
  redisservice.get(req.params.name, function(err, data) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(JSON.parse(data));
    }
  });
});
router.put('/api/geotags/:name', function(req, res, next) {
  redisservice.update(req.params.name, req.body, function(err, data) {
    if (err === 409) {
      res.sendStatus(409);
    } else if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
});
router.delete('/api/geotags/:name', function(req, res, next) {
  redisservice.del(req.params.name, function(err, amount) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
});




module.exports = router;
