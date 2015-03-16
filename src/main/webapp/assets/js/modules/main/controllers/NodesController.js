/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var NodesController = (function () {
        function NodesController(PATH_CONSTANTS, $scope, $http, $routeParams, Search, SEARCH_OPTIONS) {
            var _this = this;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$scope = $scope;
            this.$http = $http;
            $scope.options = {
                default: SEARCH_OPTIONS.PUBS,
                params: [{ value: SEARCH_OPTIONS.STUDENT, name: "Студенти", isActive: false, searchHandler: Search.searchStudentsHandler, autocompleteHandler: Search.autoCompleteStudentsHandler, resultNavPath: Search.getStudentsPath() }, { value: SEARCH_OPTIONS.PUBS, name: "Дисципліни", isActive: true, searchHandler: Search.searchPubsHandler, autocompleteHandler: Search.autoCompletePubsHandler, resultNavPath: Search.getPubsResultsPath() }]
            };
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
        NodesController.$inject = ['PATH_CONSTANTS', '$scope', '$http', "$routeParams", "Search", "SEARCH_OPTIONS"];
        return NodesController;
    })();
    return NodesController;
});
//# sourceMappingURL=NodesController.js.map