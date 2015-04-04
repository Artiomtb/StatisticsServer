/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var StudentNodeStatistics = (function () {
        function StudentNodeStatistics($scope, $http, PATH_CONSTANTS, $routeParams) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$routeParams = $routeParams;
            $http.get(PATH_CONSTANTS.STUDENT_NODE_MATERIALS, { params: { party_id: $routeParams.party_id, pub_id: $routeParams.node_id } }).success(function (node_stats) {
                _this.$scope.node_stats = node_stats;
                _this.$scope.isAnyMaterialStats = node_stats.materials.some(function (item) {
                    return item.total_attendance != 0;
                });
            }).error(function () {
            });
            $scope.imageTendencyDirection = StudentNodeStatistics.UP_IMAGE;
            $scope.imageGeneralDirection = StudentNodeStatistics.UP_IMAGE;
            $scope.collapseGeneral = function () {
                $scope.generalStatistics = !$scope.generalStatistics;
                if ($scope.generalStatistics) {
                    $scope.imageGeneralDirection = StudentNodeStatistics.DOWN_IMAGE;
                }
                else {
                    $scope.imageGeneralDirection = StudentNodeStatistics.UP_IMAGE;
                }
            };
            $scope.collapseTendency = function () {
                $scope.materialStatistics = !$scope.materialStatistics;
                if ($scope.materialStatistics) {
                    $scope.imageTendencyDirection = StudentNodeStatistics.DOWN_IMAGE;
                }
                else {
                    $scope.imageTendencyDirection = StudentNodeStatistics.UP_IMAGE;
                }
            };
        }
        Object.defineProperty(StudentNodeStatistics, "UP_IMAGE", {
            get: function () {
                return "up";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StudentNodeStatistics, "DOWN_IMAGE", {
            get: function () {
                return "down";
            },
            enumerable: true,
            configurable: true
        });
        StudentNodeStatistics.$injcet = ['$scope', '$http', 'PATH_CONSTANTS', '$routeParams'];
        return StudentNodeStatistics;
    })();
    return StudentNodeStatistics;
});
//# sourceMappingURL=StudentNodeStatistics.js.map