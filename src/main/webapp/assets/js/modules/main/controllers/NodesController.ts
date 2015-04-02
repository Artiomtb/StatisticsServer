/// <reference path="../../../shared/interfaces.ts" />

declare var jsonEvent;
class NodesController {
    static $inject = ['PATH_CONSTANTS','$scope','$http',"$routeParams", "Search", "SEARCH_OPTIONS"];
    constructor (private PATH_CONSTANTS, private $scope, private $http, $routeParams, Search: ISearchService, SEARCH_OPTIONS){

        $scope.options = Search.getSearchConfiguration(SEARCH_OPTIONS.PUBS);

        $scope.page_path = PATH_CONSTANTS.NODES_PATH;
        $scope.pub_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
        $http.get(PATH_CONSTANTS.NODES_PATH,{params: {"page": $routeParams.page}})
            .success ((pubs: IPubs)=> {
                this.$scope.pages = pubs.pages;
                this.$scope.currentPage = pubs.current_page;
                this.$scope.pubs = pubs.pubs;
                if(pubs.pubs != undefined) {
                    this.$scope.pubs_list = pubs.pubs.map(function(item) {
;                        return {name: item.pub_name, id: item.pub_id};
                    });
                }
        })
             .error(()=>{console.log("error")});
    }
}
export = NodesController;