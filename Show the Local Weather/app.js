(function() {
  var app = angular.module('weather', ['ngMaterial']);

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
    $scope.weathers = {};

    weatherService.getLocation().success(function(data) {
      var city = data.city + ',' + data.country;
      loadWeatheFromCity(city);
    });

    function loadWeatheFromCity(city) {
      weatherService.getWeatherData(city).success(function(data) {
        ShowWeather(data);
      });
    }

    function ShowWeather(data) {
      var weather = {};
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.temp = data.main.temp;
      weather.icon = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
      weather.description = data.weather[0].description;
      weather.humidity = data.main.humidity;
      weather.wind_speed = data.wind.speed;
      weather.scale = '°C';
      weather.scale_name = 'Farenheit';
      $scope.weathers[Date.now()] = weather;
    }

    $scope.switchBetweenCandF = function(weatherCard) {
      if(weatherCard.scale === '°C') {
        weatherCard.scale = '°F';
        weatherCard.temp =
            ((parseFloat(weatherCard.temp) * 9) / 5+32).toFixed(2);
        weatherCard.scale_name = 'Celsius';
      } else {
        weatherCard.scale = '°C';
        weatherCard.temp =
            ((parseFloat(weatherCard.temp) - 32) * 5/9).toFixed(2);
        weatherCard.scale_name = 'Farenheit';
      }
    };
  }]);

  app.directive('weatherCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'weatherCardMaterial.html',
    };
  });

}());
