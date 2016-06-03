var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
  console.log('redis err', err);
});

var save = function(obj, cb) {
  client.exists(obj.name, function(err, result) {
    if (result === 1) {
      cb('exists already', null);
    } else {
      client.set(obj.name, JSON.stringify(obj), cb);
    }
  });
};

var update = function(name, obj, cb) {
  console.log('testestsetest');
  client.exists(obj.name, function(err, result) {
    if (result === 0) {
      console.log('err1');
      cb('doesnt exist', null);
    } else {
      client.set(name, JSON.stringify(obj), function(err, str) {
        if (err) {
          console.log('err2');
          cb(true);
        }
        cb(null, str);
      });
    }
  });
};

var del = function(name, cb) {
  client.exists(name, function(err, result) {
    if (result === 0) {
      cb('doesnt exist', null);
    } else {
      client.del(name, cb);
    }
  });
};

var get = function(name, cb) {
  client.exists(name, function(err, result) {
    if (result === 0) {
      cb('doesnt exist', null);
    } else {
      client.get(name, cb);
    }
  });
};

var query = function(cb) {
  client.keys('*', function(err, keys) {
    if (err) {
      cb(true);
    }
    client.mget(keys, function(err, data) {
      if (err) {
        cb(true);
      }
      cb(null, data);
    });
  });
};



exports.save = save;
exports.update = update;
exports.del = del;
exports.get = get;
exports.query = query;
