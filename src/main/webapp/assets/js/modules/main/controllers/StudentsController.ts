/// <reference path="../../../shared/interfaces.ts" />

class StudentsController {
    static $inject = ['PATH_CONSTANTS','$scope','$http',"$routeParams"];

    constructor (private PATH_CONSTANTS, private $scope, private $http, $routeParams){
        $scope.page_path = PATH_CONSTANTS.STUDENTS_PATH;
        $scope.student_path = PATH_CONSTANTS.STUDENT;
        console.log("stud path " +$scope.student_path );
        $http.get(PATH_CONSTANTS.STUDENTS_PATH,{params: {page: $routeParams.page}})
            .success((students: IStudents) => {
                this.$scope.students=students.students;
                this.$scope.pages=students.pages;
            })
            .error(()=>{console.log("some error occured")});
    }
}

export=StudentsController;