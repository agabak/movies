(function(){
   'use strict';


   function controller() {
     console.log('movies-app  component is create');
   }
   angular.module("psMovies")
      .component('movieApp',{
        templateUrl: 'app/moves-list/movie-app.component.html',
        controllerAs:'vm',
        $routeConfig: [
          {path:'/list', component:'moviesList', name:'List'},
          {path:'/about',component:'appAbout', name:'About'},
          {path: '/details/:id', component: 'movieDetails', name: 'Details'},
          {path:'/**', redirectTo:['List']}
        ],
        controller: [controller]
      });
}());