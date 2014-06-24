'use strict';

/**
 * @ngdoc service
 * @name evelynApp.Photosservice
 * @description
 * # Photosservice
 * Service in the evelynApp.
 */
angular.module('evelynApp').service('PhotosService', ['$http', function PhotosService($http) {

  var apiUrl = '../../server/photos';

  var list = function(onSuccess, onFailure) {
    $http({ 
      method: 'GET', 
      url: apiUrl
    }).success(function (data) {
      if(onSuccess) {
        onSuccess(data);
      }
    }).error(function (data) {
      if(onFailure) {
        onFailure(data);
      }
    });
  };

  return {
    list: list
  };

}]);