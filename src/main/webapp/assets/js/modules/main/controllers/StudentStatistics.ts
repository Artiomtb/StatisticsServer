/// <reference path="../../../shared/interfaces.ts" />

class StudentStatistics {
    static $inject = ['$scope','$http','PATH_CONSTANTS','$routeParams'];
    constructor (private $scope, private $http, private PATH_CONSTANTS, private $routeParams) {
        $scope.pub_path = PATH_CONSTANTS.STUDENT_NODE_MATERIALS + "/" + $routeParams.party_id ;
        $http.get(PATH_CONSTANTS.STUDENT, {params: {party_id: $routeParams.party_id}})
            .success((nodes: IStudentStatistics)=>{
                this.$scope.nodes = nodes;
                if(nodes != undefined) {
                    this.$scope.nodes_list = nodes.pubs.map(function(item) {
                        return {name: item.pub_name, id: item.pub_id};
                    });
                }
            })
            .error(()=>{
            });
    }
}
//
export=StudentStatistics;
