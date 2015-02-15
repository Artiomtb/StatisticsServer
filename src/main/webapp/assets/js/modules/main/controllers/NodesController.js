/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var NodesController = (function () {
        function NodesController(PATH_CONSTANTS, $scope, $http, $routeParams, SearchProvider, SEARCH_OPTIONS) {
            var _this = this;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$scope = $scope;
            this.$http = $http;
            this.SearchProvider = SearchProvider;
            $scope.options = [{ value: SEARCH_OPTIONS.STUDENT, selected: false, name: "Студенти" }, { value: SEARCH_OPTIONS.PUBS, selected: true, name: "Дисципліни" }];
            $scope.$watch("searchArea", function (option) {
                if (option == SEARCH_OPTIONS.STUDENT) {
                    $scope.searchHandler = SearchProvider.searchStudentsHandler;
                    $scope.searchAutoCompleteHandler = SearchProvider.autoCompleteStudentsHandler;
                }
                else {
                    $scope.searchHandler = SearchProvider.searchPubsHandler;
                    $scope.searchAutoCompleteHandler = SearchProvider.autoCompletePubsHandler;
                }
            });
            $scope.searchHandler = SearchProvider.searchPubsHandler;
            $scope.searchAutoCompleteHandler = SearchProvider.autoCompletePubsHandler();
            $scope.page_path = PATH_CONSTANTS.NODES_PATH;
            $scope.pub_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
            $http.get(PATH_CONSTANTS.NODES_PATH, { params: { "page": $routeParams.page } }).success(function (pubs) {
                _this.$scope.pages = pubs.pages;
                _this.$scope.currentPage = pubs.current_page;
                _this.$scope.pubs = pubs.pubs;
            }).error(function () {
                console.log("error");
            });
        }
        NodesController.$inject = ['PATH_CONSTANTS', '$scope', '$http', "$routeParams", "SearchProvider", "SEARCH_OPTIONS"];
        return NodesController;
    })();
    return NodesController;
});
//# sourceMappingURL=NodesController.js.map