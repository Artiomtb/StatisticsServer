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
            $scope.pub_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
            console.log("node path " + $scope.path);
            console.log("path in nodes controller " + $scope.page_path);
            $http.get(PATH_CONSTANTS.NODES_PATH, { params: { "page": $routeParams.page } }).success(function (pubs) {
                console.log("nodes " + JSON.stringify(pubs));
                _this.$scope.pages = 5;
                console.log("page " + _this.$scope.pages);
                _this.$scope.pubs = pubs.pubs;
                console.log(_this.$scope.nodes);
            }).error(function () {
                console.log("error");
            });
        }
        NodesController.$inject = ['PATH_CONSTANTS', '$scope', '$http', "$routeParams"];
        return NodesController;
    })();
    return NodesController;
});
//# sourceMappingURL=NodesController.js.map