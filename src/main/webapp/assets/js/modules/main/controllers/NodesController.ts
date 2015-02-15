/// <reference path="../../../shared/interfaces.ts" />

declare var jsonEvent;
class NodesController {
    static $inject = ['PATH_CONSTANTS','$scope','$http',"$routeParams", "SearchProvider", "SEARCH_OPTIONS"];
    constructor (private PATH_CONSTANTS, private $scope, private $http, $routeParams, private SearchProvider: ISearchService, SEARCH_OPTIONS){
        $scope.options = [{value: SEARCH_OPTIONS.STUDENT, selected: false, name: "Студенти"},
            {value: SEARCH_OPTIONS.PUBS, selected: true, name: "Дисципліни" }];

        $scope.$watch("searchArea", function (option) {
            if(option == SEARCH_OPTIONS.STUDENT) {
                $scope.searchHandler = SearchProvider.searchStudentsHandler;
                $scope.searchAutoCompleteHandler = SearchProvider.autoCompleteStudentsHandler;
            } else {
                $scope.searchHandler = SearchProvider.searchPubsHandler;
                $scope.searchAutoCompleteHandler = SearchProvider.autoCompletePubsHandler;
            }
        });

        $scope.searchHandler = SearchProvider.searchPubsHandler;
        $scope.searchAutoCompleteHandler = SearchProvider.autoCompletePubsHandler();


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