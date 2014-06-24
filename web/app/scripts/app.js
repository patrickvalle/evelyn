'use strict';

/**
 * @ngdoc overview
 * @name evelynApp
 * @description
 * # evelynApp
 *
 * Main module of the application.
 */
angular.module('evelynApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/photos.html',
    controller: 'PhotosController'
  }).otherwise({
    redirectTo: '/'
  });
});
