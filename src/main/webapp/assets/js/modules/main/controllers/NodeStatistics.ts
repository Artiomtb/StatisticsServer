/// <reference path="../../../shared/interfaces.ts" />
///<amd-dependency path = 'd3_chart'>

class NodeStatistics {
    static $inject = ["$scope", "$http","$routeParams" ,"PATH_CONSTANTS"];

    constructor(private $scope, private $http, private $routeParams, private PATH_CONSTANTS){
        $scope.material_path=PATH_CONSTANTS.GENERAL_MATERIAL_PATH;
        $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH,{params: {pub_id: $routeParams.node_id }})
            .success ((pub: IPubStats)=>{
                this.$scope.node_stats = pub;
                this.$scope.df = pub.trend;
                this.$scope.trend = pub.students;
                console.log("trend studentss" + this.$scope.df.length);
                this.$scope.materials_stats = pub.materials;
                this.$scope.materials_trends = pub.materials_trends;
                console.log("materials trend "+ this.$scope.materials_trends);
                this.$scope.transitions = pub.transitions;
                var jsonEvent  = document.createEvent('CustomEvent');
                jsonEvent.initCustomEvent('json',true,true, pub.transitions);
                document.dispatchEvent(jsonEvent);
                console.log("asdfasdfasdfasd" + this.$scope.transitions);
        }).error(()=>{console.log("something went wrong")});
    }
}

export=NodeStatistics;