/// <reference path="../../../shared/interfaces.ts" />

class StudentNodeStatistics {
    static $injcet = ['$scope','$http','PATH_CONSTANTS', '$routeParams'];
    public static get UP_IMAGE():string { return "up"; }
    public static get DOWN_IMAGE():string { return "down"; }
    constructor(private $scope,private $http,private PATH_CONSTANTS,private $routeParams) {
        $http.get(PATH_CONSTANTS.STUDENT_NODE_MATERIALS,{params: {party_id: $routeParams.party_id,pub_id: $routeParams.node_id}})
            .success((node_stats: IStudentNodeStatistics)=> {
                this.$scope.node_stats = node_stats;
                this.$scope.isAnyMaterialStats = node_stats.materials.some(function(item: IStudentMaterial){
                    return item.total_attendance != 0 && item.trend.length >= 2;
                });
            })
            .error(()=> {
            });
        $scope.imageTendencyDirection =  StudentNodeStatistics.UP_IMAGE;
        $scope.imageGeneralDirection =  StudentNodeStatistics.UP_IMAGE;

        $scope.collapseGeneral = ()=>{
            $scope.generalStatistics = ! $scope.generalStatistics;
            if($scope.generalStatistics) {
                $scope.imageGeneralDirection = StudentNodeStatistics.DOWN_IMAGE;
            } else {
                $scope.imageGeneralDirection = StudentNodeStatistics.UP_IMAGE;
            }
        }

        $scope.collapseTendency = ()=>{
            $scope.materialStatistics = ! $scope.materialStatistics;
            if($scope.materialStatistics) {
                $scope.imageTendencyDirection = StudentNodeStatistics.DOWN_IMAGE;
            } else {
                $scope.imageTendencyDirection = StudentNodeStatistics.UP_IMAGE;
            }
        }
    }
}

export=StudentNodeStatistics;