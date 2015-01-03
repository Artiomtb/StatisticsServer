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
            $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH, { params: { node_id: $routeParams.node_id } }).success(function (pub) {
                _this.$scope.node_stats = pub;
                _this.$scope.df = pub.trend;
                _this.$scope.trend = pub.students;
                _this.$scope.materials_stats = pub.materials;
                _this.$scope.materials_trends = pub.materials_trends;
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