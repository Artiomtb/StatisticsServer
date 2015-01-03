/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var StudentNodeStatistics = (function () {
        function StudentNodeStatistics($scope, $http, PATH_CONSTANTS, $routeParams) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$routeParams = $routeParams;
            $http.get(PATH_CONSTANTS.STUDENT_NODE_MATERIALS, { params: { party_id: $routeParams.party_id, node_id: $routeParams.node_id } }).success(function (node_stats) {
                _this.$scope.node_stats = node_stats;
                console.log("node stats " + node_stats);
            }).error(function () {
                console.log("some error occured");
            });
        }
        StudentNodeStatistics.$injcet = ['$scope', '$http', 'PATH_CONSTANTS', '$routeParams'];
        return StudentNodeStatistics;
    })();
    return StudentNodeStatistics;
});
//# sourceMappingURL=StudentNodeStatistics.js.map