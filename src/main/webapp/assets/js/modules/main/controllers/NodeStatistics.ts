/// <reference path="../../../shared/interfaces.ts" />

class NodeStatistics {
    static $inject = ["$scope", "$http","$routeParams" ,"PATH_CONSTANTS"];

    constructor(private $scope, private $http, private $routeParams, private PATH_CONSTANTS){
        $scope.material_path=PATH_CONSTANTS.GENERAL_MATERIAL_PATH;
        $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH,{params: {node_id: $routeParams.node_id }})
            .success ((pub: IPubStats)=>{
                this.$scope.node_stats = pub;
                this.$scope.df = pub.trend;
                this.$scope.trend = pub.students;
                this.$scope.materials_stats = pub.materials;
                this.$scope.materials_trends = pub.materials_trends;
            console.log("materials trend "+ this.$scope.materials_trends);
        }).error(()=>{console.log("somethid went wrong")});
    }
}

export=NodeStatistics;