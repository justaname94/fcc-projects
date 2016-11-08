(function() {
  var app = angular.module('weather', ['ngMaterial']);

  app.run(function($rootScope) {
    $rootScope.weathers = {};
  });

  app.service('weatherService', function($http, $rootScope, $timeout) {
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

    self.showWeather = function(data) {
      $rootScope.$apply(function() {
        var weather = {};
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.temp = data.main.temp;
        weather.icon = 'https://openweathermap.org/img/w/' +
          data.weather[0].icon + '.png';
        weather.description = data.weather[0].description;
        weather.humidity = data.main.humidity;
        weather.wind_speed = data.wind.speed;
        weather.scale = '°C';
        weather.scale_name = 'Farenheit';
        $rootScope.weathers[Date.now()] = weather;
      });
    };

    self.loadWeatherFromCity = function(city) {
      self.getWeatherData(city).success(function(data) {
        $timeout(function() {
          self.showWeather(data);
        });
        });
    };

  });

  app.controller('weatherController', ['$scope', 'weatherService',
  function($scope, weatherService) {

    weatherService.getLocation().success(function(data) {
      var city = data.city + ',' + data.country;
      weatherService.loadWeatherFromCity(city);
    });

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

  app.controller('AutoCompleteController', ['$http', '$scope', 'weatherService',
  function($http, $scope, weatherService) {
    self = this;

    self.addCity = function(data) {
      if(data) {
        city = data.city + ',' + data.country;
        weatherService.loadWeatherFromCity(city);
      }
    };

    self.querySearch = function(query) {
      return loadAll().then(function(response) {
        var filteredSearch = response.data.filter(filterByCity,query)
        return filteredSearch;
      });
    };

    // Internal Methods
    function loadAll() {
      return $http.get('http://api.myjson.com/bins/4xor0');
    }

    function filterByCity(cities) {
      return cities.display.indexOf(this) > -1;
    }

  }]);

  app.directive('weatherCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'weatherCardMaterial.html',
    };
  });

  app.directive('autocompleteBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'autocompleteBar.html'
    };
  });

}());
