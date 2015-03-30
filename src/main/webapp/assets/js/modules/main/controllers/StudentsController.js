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
            $scope.options = {
                default: SEARCH_OPTIONS.STUDENT,
                params: [{ value: SEARCH_OPTIONS.STUDENT, name: "Студенти", isActive: true, searchHandler: Search.searchStudentsHandler, autocompleteHandler: Search.autoCompleteStudentsHandler, resultNavPath: Search.getStudentsPath() }, { value: SEARCH_OPTIONS.PUBS, name: "Дисципліни", isActive: false, searchHandler: Search.searchPubsHandler, autocompleteHandler: Search.autoCompletePubsHandler, resultNavPath: Search.getPubsResultsPath() }]
            };
            $http.get(PATH_CONSTANTS.STUDENTS_PATH, { params: { page: $routeParams.page } }).success(function (students) {
                _this.$scope.students = students.students;
                _this.$scope.pages = students.pages;
                _this.$scope.currentPage = students.current_page;
            }).error(function () {
                console.log("some error occured");
            });
        }
        StudentsController.$inject = ['PATH_CONSTANTS', '$scope', '$http', "$routeParams", "Search", "SEARCH_OPTIONS"];
        return StudentsController;
    })();
    return StudentsController;
});
//# sourceMappingURL=StudentsController.js.map