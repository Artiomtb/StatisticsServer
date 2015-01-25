/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var NodesController = (function () {
        function NodesController(PATH_CONSTANTS, $scope, $http, $routeParams) {
            var _this = this;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$scope = $scope;
            this.$http = $http;
            $scope.page_path = PATH_CONSTANTS.NODES_PATH;
            $scope.pub_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
            $http.get(PATH_CONSTANTS.NODES_PATH, { params: { "page": $routeParams.page } }).success(function (pubs) {
                _this.$scope.pages = 5;
                _this.$scope.pubs = pubs.pubs;
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