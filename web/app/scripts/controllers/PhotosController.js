'use strict';

/**
 * @ngdoc function
 * @name evelynApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evelynApp
 */
angular.module('evelynApp').controller('PhotosController', [
    '$scope', 'PhotosService', 'moment', 'API_ROOT', 
    function ($scope, $photosService, moment, API_ROOT) {

  /**
   * Public properties
   */

  $scope.photos = [];
  $scope.selectedPhoto = { image: 'image-placeholder.gif' };
  $scope.calculatedAge = '';
  $scope.selectedPhotoIndex = -1;
  $scope.hasPreviousPhoto = false;
  $scope.hasNextPhoto = false;
  $scope.shortDateFormat = 'MM/dd/yyyy';
  $scope.longDateFormat = 'EEEE, MMMM d, yyyy';
  $scope.photosPath = API_ROOT + '/assets/images/photos';
  $scope.isLoading = true;

  /**
   * Private properties
   */

   var birthDateMoment = moment('06-02-2014', 'MM-DD-YYYY');

  /**
   * Public API
   */

  $scope.onPhotoSelected = function(index) {
    $scope.isLoading = true;
    var selectedPhoto = $scope.photos[index];
    var photoUrl = $scope.photosPath + '/' + selectedPhoto.image;
    $photosService.loadPhoto(photoUrl, function() {
      // Calculate age based off of date created
      calculateAge(selectedPhoto.created);
      // Set all the other contextual BS on the scope
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

  var calculateAge = function(dateCreatedMillis) {
    var dateCreatedMoment = moment(dateCreatedMillis);
    $scope.calculatedAge = birthDateMoment.from(dateCreatedMoment, true);
  };

  // Call initialize() when this controller is loaded
  initialize();

}]);