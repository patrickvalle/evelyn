'use strict';

angular.module('evelynApp').directive('unveilsAs', [
    function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attributes) {
      var unveilsAs = $attributes.unveilsAs;
      var options = eval('(' + $attributes.unveilsAsOptions + ')') || {};
      var buffer = options.buffer || 0;
      var index = options.index || false;
      var showFirst = options.showFirst || false;
      $element.attr('data-src', unveilsAs).unveil(buffer);
      if(index && showFirst && index < showFirst) {
        $element.trigger('unveil');
      }
    }
  };
}]);