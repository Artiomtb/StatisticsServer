/// <reference path="../../../shared/interfaces.ts" />

class StudentStatistics {
    static $inject = ['$scope','$http','PATH_CONSTANTS','$routeParams'];
    constructor (private $scope, private $http, private PATH_CONSTANTS, private $routeParams) {
        console.log("in student statistics");
        $scope.node_path = PATH_CONSTANTS.STUDENT_NODE_MATERIALS + "/" + $routeParams.party_id ;
        $http.get(PATH_CONSTANTS.STUDENT, {params: {party_id: $routeParams.party_id}})
            .success((nodes: IStudentStatistics)=>{
                this.$scope.nodes = nodes;
            })
            .error(()=>{
                console.log("someting bad happend");
            });
    }
}

export=StudentStatistics;
