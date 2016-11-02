(function() {
  var app = angular.module('weather', []);

  app.directive('weatherCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'weatherCard.html',

      controller: ['$scope', '$http', function($scope, $http) {
        // $scope.weathers = [];
        $scope.weather = {};
        getGeoCoords(function(coords) {
          var apiKey = 'ce8874013ab7f94c2ac981a7bd8f2664';
          var reqWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.lat +
          '&lon=' + coords.lng + '&units=metric'+ '&appid=' + apiKey;
          $http.get(reqWeatherUrl).success(function(data) {
          $scope.weather.name = data.name;
          $scope.weather.country = data.sys.country;
          $scope.weather.temp = data.main.temp;
          $scope.weather.icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
          $scope.weather.description = data.weather[0].description;
          $scope.weather.humidity = data.main.humidity;
          $scope.weather.wind_speed = data.wind.speed;
          $scope.weather.scale = '°C';
          //  $scope.weathers.push($scope.weather);
          });
        });

        $scope.celsiusToFarenheit = function() {
          if($scope.weather.scale === '°C') {
            $scope.weather.scale = '°F';
            $scope.weather.temp =
               ((parseFloat($scope.weather.temp) * 9) / 5+32).toFixed(2);
          }
        };

        $scope.farenheitToCelsius = function() {
          if($scope.weather.scale === '°F') {
            $scope.weather.scale = '°C';
            $scope.weather.temp =
               ((parseFloat($scope.weather.temp) - 32) * 5/9).toFixed(2);
          }
        };

      }],
      controllerAs: 'weather'
    };
  });

}());
