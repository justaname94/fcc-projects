(function() {
  var app = angular.module('weather', []);

  app.controller('cardController', ['$scope', '$http', function($scope, $http) {
    $scope.weathers = [];
    $scope.weather = {};
      getGeoCoords(function(coords) {
      var apiKey = 'ce8874013ab7f94c2ac981a7bd8f2664';
      var reqWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.lat +
      '&lon=' + coords.lng + '&units=metric'+ '&appid=' + apiKey;
      $http.get(reqWeatherUrl).success(function(data) {
        console.log(data);
        $scope.weather.name = data.name;
        $scope.weather.country = data.sys.country;
        $scope.weather.temperature = data.main.temp;
        $scope.weather.description = data.weather[0].description;
        $scope.weather.humidity = data.main.humidity;
        $scope.weather.wind_speed = data.wind.speed;
        $scope.weathers.push($scope.weather);
      });
    });

  }]);

}());

// My API Key: ce8874013ab7f94c2ac981a7bd8f2664
