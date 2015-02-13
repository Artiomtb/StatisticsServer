define(["require", "exports", "d3_chart", "ng-slider"], function (require, exports) {
    /// <reference path="../../../shared/interfaces.ts" />
    var NodeStatistics = (function () {
        function NodeStatistics($scope, $http, $routeParams, PATH_CONSTANTS, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$routeParams = $routeParams;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            $scope.material_path = PATH_CONSTANTS.GENERAL_MATERIAL_PATH;
            $scope.value = "0";
            $scope.options = {
                from: 1,
                to: 30,
                step: 1,
                dimension: " min",
                css: {
                    pointer: {
                        "background-color": "#337ab7",
                        "border-radius": "50%"
                    },
                    before: { "background-color": "#C6D8E1" },
                    after: { "background-color": "#C6D8E1" }
                }
            };
            var graphDataCallback = function (pub) {
                if (angular.element(document.getElementsByTagName("svg"))) {
                    angular.element(document.getElementsByTagName("svg")).remove();
                    console.log("remove svg");
                }
                _this.$scope.transitions = pub.transitions;
                _this.$scope.node_stats = pub;
                _this.$scope.df = pub.trend;
                _this.$scope.trend = pub.students;
                _this.$scope.materials_stats = pub.materials;
                _this.$scope.materials_trends = pub.materials_trends;
                $scope.value = pub.transitions.link_time;
                document.json = pub.transitions;
                var jsonEvent = new CustomEvent("jsonEvent", { detail: pub.transitions });
                document.dispatchEvent(jsonEvent);
                $scope.loadGraph = false;
            };
            $scope.$watch("value", function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                $http.get(PATH_CONSTANTS.UPDATE_GRAPH, { params: { pub_id: $routeParams.node_id, link_time: newValue } }).success(function (data) {
                    if (angular.element(document.getElementsByTagName("svg"))) {
                        angular.element(document.getElementsByTagName("svg")).remove();
                        console.log("remove svg");
                    }
                    document.json = data;
                    $scope.loadGraph = false;
                    var jsonEvent = new CustomEvent("jsonEvent", { detail: data });
                    document.dispatchEvent(jsonEvent);
                }).error(function () {
                    console.log("something went wrong");
                });
            });
            $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH, { params: { pub_id: $routeParams.node_id } }).success(graphDataCallback).error(function () {
                console.log("something went wrong");
            });
        }
        NodeStatistics.$inject = ["$scope", "$http", "$routeParams", "PATH_CONSTANTS", "$timeout"];
        return NodeStatistics;
    })();
    return NodeStatistics;
});
//# sourceMappingURL=NodeStatistics.js.map