/// <reference path="../../../shared/interfaces.ts" />

declare var jsonEvent;
class NodesController {
    static $inject = ['PATH_CONSTANTS','$scope','$http',"$routeParams", "Search", "SEARCH_OPTIONS"];
    constructor (private PATH_CONSTANTS, private $scope, private $http, $routeParams, Search: ISearchService, SEARCH_OPTIONS){

        $scope.options = {
            default: SEARCH_OPTIONS.PUBS,
            params: [{value: SEARCH_OPTIONS.STUDENT, name: "Студенти",
                isActive: false,
                searchHandler: Search.searchStudentsHandler,
                autocompleteHandler: Search.autoCompleteStudentsHandler,
                resultNavHandler: Search.resultNavHandlerStudents},
            {value: SEARCH_OPTIONS.PUBS, name: "Дисципліни",
                isActive: true,
                searchHandler: Search.searchPubsHandler,
                autocompleteHandler: Search.autoCompletePubsHandler,
                resultNavHandler: Search.resultNavHandlerPubs }]};

        $scope.page_path = PATH_CONSTANTS.NODES_PATH;
        $scope.pub_path = PATH_CONSTANTS.GENERAL_NODE_PATH;
        $http.get (PATH_CONSTANTS.NODES_PATH,{params: {"page": $routeParams.page}})
            .success ((pubs: IPubs)=> {
                this.$scope.pages = pubs.pages;
                this.$scope.currentPage = pubs.current_page;
                this.$scope.pubs = pubs.pubs;
        })
             .error(()=>{console.log("error")});
    }
}
export = NodesController;