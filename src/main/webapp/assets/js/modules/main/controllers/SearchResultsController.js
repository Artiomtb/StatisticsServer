define(["require", "exports"], function (require, exports) {
    var SearchResultsController = (function () {
        function SearchResultsController($scope, search, $routeParams) {
            var _this = this;
            this.$scope = $scope;
            this.search = search;
            this.$routeParams = $routeParams;
            search.getSearchResults($routeParams.searchArea, $routeParams.queryString).success(function (data) {
                _this.$scope.results = data;
                _this.$scope.results_list = data.results.items.map(function (entry) {
                    return { name: entry.name, id: entry.id };
                });
            }).error(function () {
                console.log("Oops something went really wrong");
            });
        }
        SearchResultsController.$inject = ["$scope", "Search", "$routeParams"];
        return SearchResultsController;
    })();
    return SearchResultsController;
});
//# sourceMappingURL=SearchResultsController.js.map