/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var StudentsController = (function () {
        function StudentsController(PATH_CONSTANTS, $scope, $http, $routeParams) {
            var _this = this;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$scope = $scope;
            this.$http = $http;
            $scope.page_path = PATH_CONSTANTS.STUDENTS_PATH;
            $scope.student_path = PATH_CONSTANTS.STUDENT;
            console.log("stud path " + $scope.student_path);
            $http.get(PATH_CONSTANTS.STUDENTS_PATH, { params: { page: $routeParams.page } }).success(function (students) {
                _this.$scope.students = students.students;
                _this.$scope.pages = 10;
            }).error(function () {
                console.log("some error occured");
            });
        }
        StudentsController.$inject = ['PATH_CONSTANTS', '$scope', '$http', "$routeParams"];
        return StudentsController;
    })();
    return StudentsController;
});
//# sourceMappingURL=StudentsController.js.map