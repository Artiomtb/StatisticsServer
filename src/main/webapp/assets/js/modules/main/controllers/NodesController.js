/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var NodesController = (function () {
        function NodesController(PATH_CONSTANTS, $scope, $http, $routeParams) {
            var _this = this;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$scope = $scope;
            this.$http = $http;
            console.log("create nodes controller " + $scope.page_path);
            console.log("route_param" + $routeParams.page);
            $scope.page_path = PATH_CONSTANTS.NODES_PATH;
            $scope.node_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
            console.log("node path " + $scope.path);
            console.log("path in nodes controller " + $scope.page_path);
            $http.get(PATH_CONSTANTS.NODES_PATH, { params: { "page": $routeParams.page } }).success(function (pubs) {
                console.log("pubs " + JSON.stringify(pubs));
                _this.$scope.pages = 10;
                console.log("page " + _this.$scope.pages);
                _this.$scope.nodes = pubs.pubs;
                console.log(_this.$scope.pubs);
            }).error(function () {
                console.log("error");
            });
        }
        NodesController.$inject = ['PATH_CONSTANTS', '$scope', '$http', "$routeParams"];
        return NodesController;
    })();
    return NodesController;
});
