(function() {
    "use strict";

    angular.module("psMovies")
          .component('hellWorld',{
              template: '<h1>Hello World</h1>',
              controller: function($scope){
                  console.log("Component is")
              }
          })

}());