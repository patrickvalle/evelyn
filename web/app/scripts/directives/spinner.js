'use strict';

/**
 * @ngdoc directive
 * @name evelynApp.directive:spinner
 * @description
 * # spinner
 */
angular.module('evelynApp').directive('spinner', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      angular.element(element).addClass('spinner').spin(scope.$eval(attrs.spinner));
    }
  };
});
