/// <reference path="../../../shared/interfaces.ts" />
///<amd-dependency path = 'd3_chart'>
///<amd-dependency path="ng-slider">
declare var angular;
class NodeStatistics {
    static $inject = ["$scope", "$http","$routeParams" ,"PATH_CONSTANTS", "$timeout"];

    constructor(private $scope, private $http, private $routeParams, private PATH_CONSTANTS, $timeout){
        $scope.material_path=PATH_CONSTANTS.GENERAL_MATERIAL_PATH;

        $scope.value = "5";
        $scope.options = {
            from: 1,
            to: 30,
            step: 1,
            dimension: " min",
            css: {
                pointer: {
                    "background-color": "#337ab7",
                    "border-radius": "50%"
                },
                before: {"background-color": "#C6D8E1"},
                after: {"background-color": "#C6D8E1"}

            }
        };

        var isSlideMouseDown = false;

        $scope.updateGraph = function () {
            console.log("down");
            isSlideMouseDown = true;
        }

        var graphDataCallback = (pub: IPubStats)=>{
            if(angular.element(document.getElementsByTagName("svg"))) {
                angular.element(document.getElementsByTagName("svg")).remove();
                console.log("remove svg");
            }
            this.$scope.transitions = pub.transitions;
            this.$scope.node_stats = pub;
            this.$scope.df = pub.trend;
            this.$scope.trend = pub.students;
            this.$scope.materials_stats = pub.materials;
            this.$scope.materials_trends = pub.materials_trends;
            $scope.value = pub.transitions.link_time;
            document.json = pub.transitions;
            var jsonEvent  = new CustomEvent("jsonEvent", {detail: pub.transitions});
            document.dispatchEvent(jsonEvent);
            $scope.loadGraph = false;
        };


        angular.element(document).bind("mouseup", ()=> {
            $timeout(()=>{
                $scope.loadGraph = true;
                console.log($scope.value);
                if (isSlideMouseDown) {
                    isSlideMouseDown = false;
                    console.log(PATH_CONSTANTS.UPDATE_GRAPH);
                    $http.get(PATH_CONSTANTS.UPDATE_GRAPH, {params: {pub_id: $routeParams.node_id, link_time: $scope.value}})
                        .success(function (data) {
                            if(angular.element(document.getElementsByTagName("svg"))) {
                                angular.element(document.getElementsByTagName("svg")).remove();
                                console.log("remove svg");
                            }
                            document.json = data;
                            $scope.loadGraph = false;
                            var jsonEvent  = new CustomEvent("jsonEvent", {detail: data});
                            document.dispatchEvent(jsonEvent);
                        })
                        .error(()=>{console.log("something went wrong")});
                }
            }, 500);
        });

        $http.get(PATH_CONSTANTS.GENERAL_NODE_PATH,{params: {pub_id: $routeParams.node_id }})
            .success (graphDataCallback)
            .error(()=>{console.log("something went wrong")});
    }
}

export=NodeStatistics;