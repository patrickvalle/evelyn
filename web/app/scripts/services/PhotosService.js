'use strict';

/**
 * @ngdoc service
 * @name evelynApp.Photosservice
 * @description
 * # Photosservice
 * Service in the evelynApp.
 */
angular.module('evelynApp').service('PhotosService', function PhotosService() {
  
  var list = function() {
    var photos = [];
    for(var i = 0; i < 25; i++) {
      photos[i] = {
        image: {
          url: 'http://www.gettyimages.com/CMS/StaticContent/1357941082241_new_banner-700x465.jpg'
        },
        thumbnail: {
          url: 'http://www.gettyimages.com/CMS/StaticContent/1357941082241_new_banner-700x465.jpg'
        },
        timestamp: new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * i))
      };
    }
    return photos;
  };

  return {
    list: list
  };

});