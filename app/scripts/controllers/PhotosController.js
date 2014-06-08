'use strict';

/**
 * @ngdoc function
 * @name evelynApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evelynApp
 */
angular.module('evelynApp').controller('PhotosController', ['$scope', 'PhotosService', function ($scope, $photosService) {

  $scope.photos = [];
  $scope.selectedPhoto = {};

  $scope.onPhotoSelected = function(photo) {
    $scope.selectedPhoto = photo;
  };

  var initialize = function() {
    $scope.photos = $photosService.list();
  };

  initialize();

}]);