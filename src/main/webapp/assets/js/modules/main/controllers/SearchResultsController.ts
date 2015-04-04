class SearchResultsController {
    static $inject = ["$scope", "Search", "$routeParams"];
    constructor(private $scope, private search, private $routeParams){
        this.$scope.searchArea = this.$routeParams.searchArea;
        this.$scope.queryString = this.$routeParams.queryString;
        this.$scope.options = search.getSearchConfiguration($routeParams.searchArea, $routeParams.queryString);
        search.getSearchResults($routeParams.searchArea, $routeParams.queryString, $routeParams.page)
            .success((data)=> {
                this.$scope.results = data;
                if(data != undefined && data.results != undefined){
                    this.$scope.results_list = data.results.items.map(function(entry){
                        return {name: entry.name, id: entry.id}
                    });
                }
                this.$scope.pages = data.pages;
                this.$scope.currentPage = data.current_page;
            }).error(function(){
                console.log("Oops something went really wrong");
            });
    }
}

export= SearchResultsController;