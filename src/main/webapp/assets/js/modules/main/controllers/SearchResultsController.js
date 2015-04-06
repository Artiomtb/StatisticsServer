define(["require", "exports"], function (require, exports) {
    var SearchResultsController = (function () {
        function SearchResultsController($scope, search, $routeParams) {
            var _this = this;
            this.$scope = $scope;
            this.search = search;
            this.$routeParams = $routeParams;
            alert("asdfasd");
            this.$scope.searchArea = this.$routeParams.searchArea;
            console.log(this.$scope.searchArea);
            this.$scope.queryString = this.$routeParams.queryString;
            this.$scope.options = search.getSearchConfiguration($routeParams.searchArea, $routeParams.queryString);
            search.getSearchResults($routeParams.searchArea, $routeParams.queryString, $routeParams.page).success(function (data) {
                _this.$scope.results = data;
                if (data != undefined && data.results != undefined) {
                    _this.$scope.results_list = data.results.items.map(function (entry) {
                        return { name: entry.name, id: entry.id };
                    });
                }
                _this.$scope.pages = data.pages;
                _this.$scope.currentPage = data.current_page;
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