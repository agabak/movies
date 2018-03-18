describe("The movieList component", function(){
  
    beforeEach(module("psMovies"));
    var moviesList;
    beforeEach(inject(function($componentcontroller){
        moviesList = $componentcontroller("movesList",{
           $scope:{}
        });
    }));

    it('should be  created', function(){
       expect(moviesList).toBeDefined();
    });
});