'use strict';

/**
 * @ngdoc function
 * @name evelynApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the evelynApp
 */
angular.module('evelynApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
