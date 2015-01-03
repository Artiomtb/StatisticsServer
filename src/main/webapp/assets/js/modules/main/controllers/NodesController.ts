/// <reference path="../../../shared/interfaces.ts" />

class NodesController {
    static $inject = ['PATH_CONSTANTS','$scope','$http',"$routeParams"];

    constructor (private PATH_CONSTANTS, private $scope, private $http, $routeParams){
        console.log("create nodes controller " + $scope.page_path);
        console.log("route_param" + $routeParams.page);
        $scope.page_path = PATH_CONSTANTS.NODES_PATH;
        $scope.node_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
        console.log("node path " + $scope.path );
        console.log("path in nodes controller " + $scope.page_path);
        $http.get (PATH_CONSTANTS.NODES_PATH,{params: {"page": $routeParams.page}})
            .success ((nodes: INodes)=> {
                console.log("nodes " + JSON.stringify(nodes));
                this.$scope.pages=nodes.pages;
                console.log("page " + this.$scope.pages);
                this.$scope.nodes = nodes.nodes;
            console.log(this.$scope.nodes);
        })
             .error(()=>{console.log("error")});
    }
}

export = NodesController;