/// <reference path="../../../shared/interfaces.ts" />

class NodeStatistics {
    static $inject = ["$scope", "$http","$routeParams" ,"PATH_CONSTANTS"];

    constructor(private $scope, private $http, private $routeParams, private PATH_CONSTANTS){
        $scope.material_path=PATH_CONSTANTS.GENERAL_MATERIAL_PATH;
        $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH,{params: {node_id: $routeParams.node_id }})
            .success ((node: INodeStats)=>{
                this.$scope.node_stats = node;
                this.$scope.df = node.trend;
                this.$scope.trend = node.students;
                this.$scope.materials_stats = node.materials;
                this.$scope.materials_trends = node.materials_trends;
            console.log("materials trend "+ this.$scope.materials_trends);
        }).error(()=>{console.log("somethid went wrong")});
    }
}

export=NodeStatistics;