/// <reference path="../../../shared/interfaces.ts" />
///<amd-dependency path = 'd3_chart'>
define(["require", "exports", "d3_chart"], function (require, exports) {
    var NodeStatistics = (function () {
        function NodeStatistics($scope, $http, $routeParams, PATH_CONSTANTS) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$routeParams = $routeParams;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            $scope.material_path = PATH_CONSTANTS.GENERAL_MATERIAL_PATH;
            $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH, { params: { pub_id: $routeParams.node_id } }).success(function (pub) {
                _this.$scope.transitions = pub.transitions;
                _this.$scope.node_stats = pub;
                _this.$scope.df = pub.trend;
                _this.$scope.trend = pub.students;
                _this.$scope.materials_stats = pub.materials;
                _this.$scope.materials_trends = pub.materials_trends;
                document.json = pub.transitions;
                var jsonEvent = new CustomEvent("jsonEvent", { detail: pub.transitions });
                document.dispatchEvent(jsonEvent);
            }).error(function () {
                console.log("something went wrong");
            });
        }
        NodeStatistics.$inject = ["$scope", "$http", "$routeParams", "PATH_CONSTANTS"];
        return NodeStatistics;
    })();
    return NodeStatistics;
});
//# sourceMappingURL=NodeStatistics.js.map