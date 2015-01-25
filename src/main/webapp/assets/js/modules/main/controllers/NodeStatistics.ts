/// <reference path="../../../shared/interfaces.ts" />
///<amd-dependency path = 'd3_chart'>

class NodeStatistics {
    static $inject = ["$scope", "$http","$routeParams" ,"PATH_CONSTANTS"];

    constructor(private $scope, private $http, private $routeParams, private PATH_CONSTANTS){
        $scope.material_path=PATH_CONSTANTS.GENERAL_MATERIAL_PATH;
        $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH,{params: {pub_id: $routeParams.node_id }})
            .success ((pub: IPubStats)=>{
                this.$scope.transitions = pub.transitions;
                this.$scope.node_stats = pub;
                this.$scope.df = pub.trend;
                this.$scope.trend = pub.students;
                this.$scope.materials_stats = pub.materials;
                this.$scope.materials_trends = pub.materials_trends;
                document.json = pub.transitions;
                var jsonEvent  = new CustomEvent("jsonEvent", {detail: pub.transitions});
                document.dispatchEvent(jsonEvent);
        }).error(()=>{console.log("something went wrong")});
    }
}

export=NodeStatistics;