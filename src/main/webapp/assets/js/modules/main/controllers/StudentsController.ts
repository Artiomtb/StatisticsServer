/// <reference path="../../../shared/interfaces.ts" />

class StudentsController {
    static $inject = ['PATH_CONSTANTS','$scope','$http',"$routeParams", "Search", "SEARCH_OPTIONS"];

    constructor (private PATH_CONSTANTS, private $scope, private $http, $routeParams, Search: ISearchService, SEARCH_OPTIONS){
        $scope.page_path = PATH_CONSTANTS.STUDENTS_PATH;
        $scope.student_path = PATH_CONSTANTS.STUDENT;
        $scope.options = {
            default: SEARCH_OPTIONS.STUDENT,
            params: [{value: SEARCH_OPTIONS.STUDENT, name: "Студенти",
                isActive: true,
                searchHandler: Search.searchStudentsHandler,
                autocompleteHandler: Search.autoCompleteStudentsHandler,
                resultNavPath: Search.getStudentsPath()},
                {value: SEARCH_OPTIONS.PUBS, name: "Дисципліни",
                    isActive: false,
                    searchHandler: Search.searchPubsHandler,
                    autocompleteHandler: Search.autoCompletePubsHandler,
                    resultNavPath: Search.getPubsResultsPath() }]};

        $http.get(PATH_CONSTANTS.STUDENTS_PATH,{params: {page: $routeParams.page}})
            .success((students: IStudents) => {
                this.$scope.students=students.students;
                this.$scope.pages = students.pages;
                this.$scope.currentPage = students.current_page;
            })
            .error(()=>{console.log("some error occured")});
    }
}

export=StudentsController;