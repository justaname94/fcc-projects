(function() {
  var app = angular.module('weather', []);

  app.service('weatherService', function($http) {
    var self = this;

    self.getLocation = function() {
      return $http.jsonp('http://ipinfo.io/json?callback=JSON_CALLBACK');
    };

    self.getWeatherData = function(city) {
      var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
      var units = '&units=metric';
      var appId = '&appid=ce8874013ab7f94c2ac981a7bd8f2664';
      var cb = '&callback=JSON_CALLBACK';
      return $http.jsonp(api + city + units + appId + cb);
    };
  });

  app.controller('weatherController', ['$scope', 'weatherService', function($scope, weatherService) {
    $scope.weathers = [];
    $scope.weather = {};
    weatherService.getLocation().success(function(data) {
      var city = data.city + ',' + data.country;
      $scope.weather.city = data.city;
      $scope.weather.country = data.country;

      weatherService.getWeatherData(city).success(function(data) {
        ShowWeather(data);
      });
    });

    function ShowWeather(data) {
      $scope.weather.temp = data.main.temp;
      $scope.weather.icon = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
      $scope.weather.description = data.weather[0].description;
      $scope.weather.humidity = data.main.humidity;
      $scope.weather.wind_speed = data.wind.speed;
      $scope.weather.scale = '°C';
      $scope.weather.scale_name = 'Farenheit';
      $scope.weathers.push($scope.weather);
    }

    $scope.switchBetweenCandF = function() {
      if($scope.weather.scale === '°C') {
        $scope.weather.scale = '°F';
        $scope.weather.temp =
            ((parseFloat($scope.weather.temp) * 9) / 5+32).toFixed(2);
        $scope.weather.scale_name = 'Celsius';
      } else {
        $scope.weather.scale = '°C';
        $scope.weather.temp =
            ((parseFloat($scope.weather.temp) - 32) * 5/9).toFixed(2);
        $scope.weather.scale_name = 'Farenheit';
      }
    };
  }]);

  app.directive('weatherCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'weatherCard.html',

      // controller: '',
      // controllerAs: 'weather'
    };
  });

}());
