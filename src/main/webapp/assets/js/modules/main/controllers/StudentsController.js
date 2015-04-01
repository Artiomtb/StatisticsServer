/// <reference path="../../../shared/interfaces.ts" />
define(["require", "exports"], function (require, exports) {
    var StudentsController = (function () {
        function StudentsController(PATH_CONSTANTS, $scope, $http, $routeParams, Search, SEARCH_OPTIONS) {
            var _this = this;
            this.PATH_CONSTANTS = PATH_CONSTANTS;
            this.$scope = $scope;
            this.$http = $http;
            $scope.page_path = PATH_CONSTANTS.STUDENTS_PATH;
            $scope.student_path = PATH_CONSTANTS.STUDENT;
            $scope.options = Search.getSearchConfiguration({ students: true });
            $http.get(PATH_CONSTANTS.STUDENTS_PATH, { params: { page: $routeParams.page } }).success(function (students) {
                _this.$scope.students = students.students;
                if (students.students != undefined) {
                    _this.$scope.students_list = students.students.map(function (student) {
                        return { name: student.party_name, id: student.party_id };
                    });
                }
                _this.$scope.pages = students.pages;
                _this.$scope.currentPage = students.current_page;
            }).error(function () {
                console.log("some errors");
            });
        }
        StudentsController.$inject = ['PATH_CONSTANTS', '$scope', '$http', "$routeParams", "Search", "SEARCH_OPTIONS"];
        return StudentsController;
    })();
    return StudentsController;
});
//# sourceMappingURL=StudentsController.js.map