(function(){
    'use strict';
     
    function getMovie($http,id){
        return $http.get('movies.json')
                .then(function(response){
                   return  response.data.find(m => m.id === id);
        });
    }

    function controller($http) {
        var model = this;
        model.title = "Detail Controller";
        model.movie = {};

        model.$routerOnActivate = function(next, previous) {
                const urlId = next.params.id;
                getMovie($http,urlId).then(function(movie){
                    model.movie = movie;
                })
            }
    }

    function activate($timeout) {
        return $timeout(function(){
            return  true;
        }, 2000);
    }

    angular.module('psMovies')
       .component('movieDetails',{
           templateUrl:'app/moves-list/movie-detail.component.html',
           controllerAs: 'vm',
               $routeConfig:[
               {path:'/overview', component:'movieOverview', name:'Overview'},
               {path: '/cast', component:'movieCast', name:'Cast'},
               {path:'/director', component:'movieDirector', name:'Director'}
           ],
           controller:['$http',controller]
       })
}());