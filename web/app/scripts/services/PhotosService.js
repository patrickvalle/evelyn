'use strict';

/**
 * @ngdoc service
 * @name evelynApp.Photosservice
 * @description
 * # Photosservice
 * Service in the evelynApp.
 */
angular.module('evelynApp').service('PhotosService', 
    ['$http', 'API_ROOT', 
    function PhotosService($http, API_ROOT) {

  var list = function(onSuccess, onFailure) {
    $http({ 
      method: 'GET', 
      url: API_ROOT + '/photos'
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

  var loadPhoto = function(atUrl, onSuccess, onFailure) {
    $http({ 
      method: 'GET', 
      url: atUrl,
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
    list: list,
    loadPhoto: loadPhoto
  };

}]);