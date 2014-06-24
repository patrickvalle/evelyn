'use strict';

/**
 * @ngdoc function
 * @name evelynApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evelynApp
 */
angular.module('evelynApp').controller('PhotosController', 
    ['$scope', 'PhotosService', 'API_ROOT', function ($scope, $photosService, API_ROOT) {

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
  $scope.photosPath = API_ROOT + '/assets/images/photos';
  $scope.isLoading = true;

  /**
   * Public API
   */

  $scope.onPhotoSelected = function(index) {
    $scope.isLoading = true;
    var selectedPhoto = $scope.photos[index];
    var photoUrl = $scope.photosPath + '/' + selectedPhoto.image;
    $photosService.loadPhoto(photoUrl, function() {
      $scope.selectedPhoto = selectedPhoto;
      $scope.selectedPhotoIndex = index;
      $scope.hasNextPhoto = hasPhotoAtIndex(index + 1);
      $scope.hasPreviousPhoto = hasPhotoAtIndex(index - 1);
      $scope.isLoading = false;
    });
  };

  $scope.onNextPhoto = function() {
    var index = $scope.selectedPhotoIndex + 1;
    $scope.onPhotoSelected(index);
  };

  $scope.onPreviousPhoto = function() {
    var index = $scope.selectedPhotoIndex - 1;
    $scope.onPhotoSelected(index);
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

  // Call initialize() when this controller is loaded
  initialize();

}]);