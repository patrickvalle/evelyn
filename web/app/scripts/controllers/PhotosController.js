'use strict';

/**
 * @ngdoc function
 * @name evelynApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evelynApp
 */
angular.module('evelynApp').controller('PhotosController', 
    ['$scope', 'PhotosService', function ($scope, $photosService) {

  /**
   * Public properties
   */

  $scope.photos = [];
  $scope.selectedPhoto = {};
  $scope.selectedPhotoIndex = -1;
  $scope.hasPreviousPhoto = false;
  $scope.hasNextPhoto = false;
  $scope.shortDateFormat = 'MM/dd/yyyy';
  $scope.longDateFormat = 'EEEE, MMMM d, yyyy';

  /**
   * Public API
   */

  $scope.onPhotoSelected = function(index) {
    $scope.selectedPhoto = $scope.photos[index];
    $scope.selectedPhotoIndex = index;
    $scope.hasNextPhoto = hasPhotoAtIndex(index + 1);
    $scope.hasPreviousPhoto = hasPhotoAtIndex(index - 1);
  };

  $scope.onNextPhoto = function() {
    var index = $scope.selectedPhotoIndex + 1;
    $scope.hasNextPhoto = hasPhotoAtIndex(index + 1);
    $scope.hasPreviousPhoto = true;
    onPhotoNavigation(index);
  };

  $scope.onPreviousPhoto = function() {
    var index = $scope.selectedPhotoIndex - 1;
    $scope.hasNextPhoto = true;
    $scope.hasPreviousPhoto = hasPhotoAtIndex(index - 1);
    onPhotoNavigation(index);
  };

  /**
   * Private methods
   */

  var initialize = function() {
    $photosService.list(function(photos) {
      $scope.photos = photos;
    });
  };

  var hasPhotoAtIndex = function(index) {
    var photo = $scope.photos[index];
    return photo ? true : false;
  };

  var onPhotoNavigation = function(index) {
    var photo = $scope.photos[index];
    if(photo) {
      $scope.selectedPhoto = photo;
      $scope.selectedPhotoIndex = index;
    }
  };

  // Call initialize() when this controller is loaded
  initialize();

}]);