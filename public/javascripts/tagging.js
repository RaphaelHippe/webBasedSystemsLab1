
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

exports.getData = getData;

exports.addTag = addTag;
