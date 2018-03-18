(function(){
   'use strict';
   
   function controller() {
       var model = this;
       
       model.$onInit = function(){
           model.entries = new Array(model.value);
       }

       model.$onChanges = function(){
        model.entries = new Array(model.value);
       }
   }
   angular.module("psMovies")
         .component("movieRating",{
             templateUrl: 'app/moves-list/movie-rating.component.html',
             controllerAs:'vm',
             transclude:true,
             controller:[controller],
             bindings:{
                 value:"<"
             }
         });
}());