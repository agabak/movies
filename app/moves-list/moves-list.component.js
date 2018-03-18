(function() {
    "use strict";
    // return a promise;
    function getMovies($http) {
        var apiUrl = 'movies.json';
        return  $http.get(apiUrl).then(function(response){
            return  response.data;
        });
    }
     
    function controller($http){
        var model = this;
        model.movies = [];
        
        model.$onInit = function() {
         getMovies($http).then(function(movies){
             model.movies = movies;
             console.log(movies);
         });
        };

        model.upRating = function(movie) {
            if(movie.rating < 5) {
                movie.rating += 1;
            }
        }

        model.downRating = function(movie) {
            if(movie.rating > 1) {
                movie.rating -= 1;
            } 
        }
    }
    angular.module("psMovies")
         .component("moviesList",{
             templateUrl:'app/moves-list/moves-list.component.html',
             controllerAs: "vm",
             controller:["$http",controller]
         });
}());