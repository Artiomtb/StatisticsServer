/// <reference path="../../../shared/interfaces.ts" />

declare var jsonEvent;
class NodesController {
    static $inject = ['PATH_CONSTANTS','$scope','$http',"$routeParams"];
    constructor (private PATH_CONSTANTS, private $scope, private $http, $routeParams){
        $scope.page_path = PATH_CONSTANTS.NODES_PATH;
        $scope.pub_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
        $http.get (PATH_CONSTANTS.NODES_PATH,{params: {"page": $routeParams.page}})
            .success ((pubs: IPubs)=> {
                this.$scope.pages = 5;
                this.$scope.pubs = pubs.pubs;
        })
             .error(()=>{console.log("error")});
    }
}
export = NodesController;