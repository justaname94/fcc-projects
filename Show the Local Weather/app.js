(function() {
  var app = angular.module('weather', []);

  app.directive('weatherCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'weatherCard.html',
      controller: ['$scope', '$http', function($scope, $http) {
        $scope.weathers = [];
        $scope.weather = {};
        getGeoCoords(function(coords) {
          var apiKey = 'ce8874013ab7f94c2ac981a7bd8f2664';
          var reqWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.lat +
          '&lon=' + coords.lng + '&units=metric'+ '&appid=' + apiKey;
          $http.get(reqWeatherUrl).success(function(data) {
          $scope.weather.name = data.name;
          $scope.weather.country = data.sys.country;
          $scope.weather.temperature = data.main.temp;
          $scope.weather.icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
          $scope.weather.description = data.weather[0].description;
          $scope.weather.humidity = data.main.humidity;
          $scope.weather.wind_speed = data.wind.speed;
          $scope.weathers.push($scope.weather);
      });
    });
      }],
      controllerAs: 'weather'
    };
  });

}());

// My API Key: ce8874013ab7f94c2ac981a7bd8f2664
