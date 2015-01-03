/// <reference path="../../../shared/interfaces.ts" />

class StudentNodeStatistics {
    static $injcet = ['$scope','$http','PATH_CONSTANTS', '$routeParams'];
    constructor(private $scope,private $http,private PATH_CONSTANTS,private $routeParams) {
        $http.get(PATH_CONSTANTS.STUDENT_NODE_MATERIALS,{params: {party_id: $routeParams.party_id,node_id: $routeParams.node_id}})
            .success((node_stats: IStudentNodeStatistics)=> {
                this.$scope.node_stats = node_stats;
                console.log("node stats " + node_stats);
            })
            .error(()=> {
                console.log("some error occured");
            });
    }
}

export=StudentNodeStatistics;