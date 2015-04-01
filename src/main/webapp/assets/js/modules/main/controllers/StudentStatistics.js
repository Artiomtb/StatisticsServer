/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var StudentStatistics = (function () {
        function StudentStatistics($scope, $http, PATH_CONSTANTS, $routeParams) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$routeParams = $routeParams;
            $scope.pub_path = PATH_CONSTANTS.STUDENT_NODE_MATERIALS + "/" + $routeParams.party_id;
            $http.get(PATH_CONSTANTS.STUDENT, { params: { party_id: $routeParams.party_id } }).success(function (nodes) {
                _this.$scope.nodes = nodes;
                if (nodes != undefined) {
                    _this.$scope.nodes_list = nodes.pubs.map(function (item) {
                        return { name: item.pub_name, id: item.pub_id };
                    });
                }
            }).error(function () {
            });
        }
        StudentStatistics.$inject = ['$scope', '$http', 'PATH_CONSTANTS', '$routeParams'];
        return StudentStatistics;
    })();
    return StudentStatistics;
});
//# sourceMappingURL=StudentStatistics.js.map