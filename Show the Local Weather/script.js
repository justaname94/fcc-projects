// Get Geographic coordinates of the user if
// its browser supports the, otherwise display
// NYC coordinates
function getGeoCoords(cb) {
  if(Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      return cb({
        supportGeo: true,
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  } else {
    return cb({
      supportGeo: false,
      lat: 40.7128,
      lng: 40.7128
    });
  }
}

