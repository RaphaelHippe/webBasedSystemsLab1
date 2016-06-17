var geotagsTable = document.getElementById('geotagsTable');


document.getElementById('searchSubmit').addEventListener('click', function() {
      event.preventDefault();
      console.log('testest');
      var searchTerm = document.forms['discoverySearch']['search'].value;
      var xhr = new XMLHttpRequest();
      var uri = '/api/geotags/search';
      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhr.send(JSON.stringify({
        search: searchTerm
      }));

      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log('test', JSON.parse(xhr.responseText));
          // if (request.status == '200') {
          console.log('testest');
            var table = document.getElementById('geotagsTable');
            var rowCount = table.rows.length;
            while (--rowCount) table.deleteRow(rowCount);
            var locations = JSON.parse(xhr.responseText);
            for (var i = 0; i < locations.length; i++) {
              var row = table.insertRow(i + 1);
              row.insertCell(0).innerHTML = locations[i].lat;
              row.insertCell(1).innerHTML = locations[i].long;
              row.insertCell(2).innerHTML = locations[i].name;
              row.insertCell(3).innerHTML = locations[i].hash;
              row.insertCell(4).innerHTML = '<button onclick="deleteByName(' + locations[i].name + ')">X</button>';
            }
          // } else {
          //   alert(request.statusText);
          // }
        }
      };
    });

    function validate() {
      var search = document.forms["discoverySearch"]["search"].value;
      if (search === null || search === '') {
        alert("search must be filled out");
        return false;
      }
    }

    function deleteByName(name) {
      // construct an HTTP request
      console.log('abc', name);
      var xhr = new XMLHttpRequest();
      var uri = '/geotags/' + name;
      console.log('uri', uri);
      xhr.open('DELETE', uri, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      // send the collected data as JSON
      xhr.send();

      xhr.onreadystatechange = function() {
        console.log('testsetsetset');
        if (xhr.readyState == XMLHttpRequest.DONE) {
          locations = JSON.parse(xhr.responseText);
          console.log('raphi', locations, xhr.responseText);
        }
      };

    }

    var myCenter = new google.maps.LatLng(51.508742, -0.120850);

    function initialize() {
      var mapProp = {
        center: myCenter,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      var marker = new google.maps.Marker({
        position: myCenter,
      });
      marker.setMap(map);

      for (var i = 0; i < geotagsTable.rows.length; i++) {
        var myMarker = new google.maps.Marker({
          position: new google.maps.LatLng(geotagsTable.rows[i].cells[0].innerHTML, geotagsTable.rows[i].cells[1].innerHTML)
        });
        myMarker.setMap(map);
      }




    }
    google.maps.event.addDomListener(window, 'load', initialize);
