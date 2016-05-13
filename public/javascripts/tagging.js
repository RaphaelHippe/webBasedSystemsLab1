
var data = [];

var setData = function (input) {
  data = input;
  for (var i = 0; i < data.length; i++) {
    data[i] = JSON.parse(data[i]);
  }
}

var getData = function() {

  return data;
}

var addTag = function(obj) {
  data.push(obj);
}

var deleteByIndex = function(index) {
  console.log('d1', data);
  data.splice(index, 1);
  console.log('d2', data);
  return data;
}

var deleteByHash = function(hash) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].hash === hash) {
      data.splice(i, 1);
    }
  }
  return data;
}

var search = function(input) {
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
exports.setData = setData;
exports.search = search;
exports.deleteByHash = deleteByHash;
exports.deleteByIndex = deleteByIndex;
