class SearchResultsController {
    static $inject = ["$scope", "Search", "$routeParams"];
    constructor(private $scope, private search, private $routeParams){
        this.$scope.options = search.getSearchConfiguration();
        search.getSearchResults($routeParams.searchArea, $routeParams.queryString)
            .success((data)=> {
                this.$scope.results = data;
                this.$scope.results_list = data.results.items.map(function(entry){
                    return {name: entry.name, id: entry.id}
                });
            }).error(function(){
                console.log("Oops something went really wrong");
            });
    }
}

export= SearchResultsController;