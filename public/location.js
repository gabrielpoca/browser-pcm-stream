let lat, lng, request;
var placeSearch, autocomplete;
  function saveLocation() {
      let place = autocomplete.getPlace();
      console.log('Place', place.formatted_address);
  }
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['(cities)']});
    autocomplete.addListener('place_changed', saveLocation);
console.log('autocomplete', autocomplete.getPlace());
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  console.log('geolocate');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      lat = geolocation.lat;
      lng = geolocation.lng;
request = new XMLHttpRequest();

request.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?key=YOUR_API_KEY&latlng=${lat},${lng}`, true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    // console.log('data', data.plus_code.compound_code.split(' ').unshift().join(' '));
    console.log('data', data.plus_code.compound_code);
    let city = data.plus_code.compound_code.split(' ');
    city.shift();
    city.join(' ');
    console.log('city', city.join(' '));
    document.getElementById('autocomplete').value = city.join(' ');

  } else {
    console.log('error');
  }
}
request.send();
      console.log('geolocation', geolocation)
    });
  }
  
}
geolocate();