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
  client.exists(name, function(err, result) {
    if (result === 0) {
      console.log('err1');
      cb('doesnt exist', null);
    } else {
      if (obj.name === name) {
        client.set(name, JSON.stringify(obj), function(err, str) {
          if (err) {
            console.log('err2');
            cb(true);
          } else {
            cb(null, str);
          }
        });
      } else {
        client.exists(obj.name, function (err, result) {
          if (err) {
            console.log('error');
            cb(true);
          } else {
            if (result === 1) {
              console.log('409');
              cb(409);
            } else {
              client.set(name, JSON.stringify(obj), function(err, str) {
                if (err) {
                  console.log('err2');
                  cb(true);
                } else {
                  cb(null, str);
                }
              });
              client.rename(name, obj.name, cb);
            }
          }
        });
      }
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
      cb(500);
    }
    client.mget(keys, function(err, data) {
      if (err) {
        cb(404);
      } else {
        cb(null, data);
      }
    });
  });
};

var search = function (input, cb) {
  if (input.charAt(0) === '#') {
    // hashtag
    query(function (err, data) {
      var myData = null;
      for (var i = 0; i < data.length; i++) {
        if (JSON.parse(data[i]).hash === input) {
          myData = data[i];
        }
      }
      if (myData) {
        cb(null, myData);
      } else {
        cb('404');
      }
    });
  } else {
    // namesearch
    get(input, cb);
  }

};


exports.search = search;
exports.save = save;
exports.update = update;
exports.del = del;
exports.get = get;
exports.query = query;
