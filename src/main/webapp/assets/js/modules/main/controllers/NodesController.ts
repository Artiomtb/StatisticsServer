/// <reference path="../../../shared/interfaces.ts" />

declare var jsonEvent;
class NodesController {
    static $inject = ['PATH_CONSTANTS','$scope','$http',"$routeParams", "Search"];
    constructor (private PATH_CONSTANTS, private $scope, private $http, $routeParams, Search: ISearchService){

        $scope.options = Search.getSearchConfiguration({pubs: true});

        $scope.page_path = PATH_CONSTANTS.NODES_PATH;
        $scope.pub_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
        $http.get (PATH_CONSTANTS.NODES_PATH,{params: {"page": $routeParams.page}})
            .success ((pubs: IPubs)=> {
                this.$scope.pages = pubs.pages;
                this.$scope.currentPage = pubs.current_page;
                this.$scope.pubs = pubs.pubs;
                this.$scope.pub_names =pubs.pubs.map(function(item) {
                    return item.node_name;
                });
        })
             .error(()=>{console.log("error")});
    }
}
export = NodesController;