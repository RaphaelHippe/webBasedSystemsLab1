
var data = [ {
 lat : 49.013790,
 long : 8.404435,
 name : 'castle',
 hash : '#sight'
 }, {
 lat : 49.013790,
 long : 8.390071,
 name : 'iwi',
 hash : '#edu'
 }
];

var getData = function () {
  return data;
}

var addTag = function (lat, long, name, hash) {
  data.push({lat: lat, long: long, name: name, hash: hash});
}

var deleteByIndex = function (index) {
  data.splice(index, 1);
  return data;
}

var deleteByHash = function (hash) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].hash === hash) {
      data.splice(i, 1);
    }
  }
  return data;
}

var search = function (input) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].name.search(input) !== -1 || data[i].hash.search(input) !== -1) {
      result.push(data[i]);
    }
  }
  return result;
}

exports.getData = getData;
exports.addTag = addTag;
exports.search = search;
exports.deleteByHash = deleteByHash;
exports.deleteByIndex = deleteByIndex;
