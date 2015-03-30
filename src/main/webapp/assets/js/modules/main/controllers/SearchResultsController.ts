class SearchResultsController {
    static $inject = ["$scope", "Search", "$routeParams"];
    constructor(private $scope, private search, private $routeParams){
        search.getSearchResults($routeParams.searchArea, $routeParams.queryString)
            .success((data)=> {
                this.$scope.results = data;
            }).error(function(){
                console.log("Oops something went really wrong");
            });
    }
}

export= SearchResultsController;