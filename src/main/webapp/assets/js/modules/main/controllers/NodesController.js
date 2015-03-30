/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var NodesController = (function () {
        function NodesController(PATH_CONSTANTS, $scope, $http, $routeParams, Search) {
            var _this = this;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$scope = $scope;
            this.$http = $http;
            $scope.options = Search.getSearchConfiguration({ pubs: true });
            $scope.page_path = PATH_CONSTANTS.NODES_PATH;
            $scope.pub_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
            $http.get(PATH_CONSTANTS.NODES_PATH, { params: { "page": $routeParams.page } }).success(function (pubs) {
                _this.$scope.pages = pubs.pages;
                _this.$scope.currentPage = pubs.current_page;
                _this.$scope.pubs = pubs.pubs;
                _this.$scope.pub_names = pubs.pubs.map(function (item) {
                    return item.node_name;
                });
            }).error(function () {
                console.log("error");
            });
        }
        NodesController.$inject = ['PATH_CONSTANTS', '$scope', '$http', "$routeParams", "Search"];
        return NodesController;
    })();
    return NodesController;
});
//# sourceMappingURL=NodesController.js.map