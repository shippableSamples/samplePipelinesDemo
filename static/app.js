(function(){
  app = angular.module('dv',['ngAnimate'])
  .controller('mainController' , mainController)
  .service('Boxes', boxService);

  var MONGO_API_URL = null;
  var POLLING_INTERVAL = 3 * 1000; // every 3 seconds

  function mainController($scope,$http, Boxes) {
    _init();

    function _init() {
      async.series([
        _getMongoApiUrl
      ], function (err) {
        if (err)
          console.log('Error while getting the MONGO_API_URL: ', err);
        else {
          _updateBoxes();
        }
      });
    }

    function _getMongoApiUrl(next) {
      $http({
        method: 'GET',
        url: '/api/MONGO_API_URL'
      })
      .then(
        function(response){
          MONGO_API_URL = response.data.MONGO_API_URL;
          return next();
        },
        function(err){
          return next(err);
        }
      );
    }

    function _updateBoxes() {
      Boxes.get(function(err, allBoxes){
        if (err)
          console.log('err', err);
        else
          $scope.allBoxes = allBoxes;

        _.delay(_updateBoxes, POLLING_INTERVAL);
      });
    }
  }

  function boxService($http) {
    return {
      get: function(callback) {
        $http({
          method: 'GET',
          url: MONGO_API_URL
        })
        .then(
          function (response) {
            var boxes = _.chain(response.data)
              .map(function(dbObj){
                var now = new Date().getTime();
                var boxUpdatedAt = new Date(dbObj.updatedAt.$date).getTime();
                var age = Math.round(10*(now - boxUpdatedAt) / 1000)/10;
                console.log('age of ', dbObj.environment, ' is ', age);
                return new Box(dbObj.color, dbObj.environment, age);
              })
              .groupBy('environment')
              .each(function(envBoxes, envName){
                _.each(envBoxes,function(envBox, index){
                  envBox.instanceId = index + 1;
                });
              })
              .map(function(value, key){
                var obj = {};
                obj.environment=key;
                obj.boxes = value;
                return obj;
              })
              .value();
            callback(null, boxes);
          },
          function (err) {
            callback(err);
          }
        );
      }
    };
  }

  function Box(color, environment, age, instanceId) {
    this.color = color;
    this.environment = environment;
    this.age = age;
    this.instanceId = instanceId;
  }
})();
