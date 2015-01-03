/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var NodeStatistics = (function () {
        function NodeStatistics($scope, $http, $routeParams, PATH_CONSTANTS) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$routeParams = $routeParams;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            $scope.material_path = PATH_CONSTANTS.GENERAL_MATERIAL_PATH;
            $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH, { params: { node_id: $routeParams.node_id } }).success(function (node) {
                _this.$scope.node_stats = node;
                _this.$scope.df = node.trend;
                _this.$scope.trend = node.students;
                _this.$scope.materials_stats = node.materials;
                _this.$scope.materials_trends = node.materials_trends;
                console.log("materials trend " + _this.$scope.materials_trends);
            }).error(function () {
                console.log("somethid went wrong");
            });
        }
        NodeStatistics.$inject = ["$scope", "$http", "$routeParams", "PATH_CONSTANTS"];
        return NodeStatistics;
    })();
    return NodeStatistics;
});
//# sourceMappingURL=NodeStatistics.js.map