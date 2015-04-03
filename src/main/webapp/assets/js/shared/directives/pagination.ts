function pegination(){
    return {
        restrict: "E",
        scope: {
            pages: "=",
            currentPage: "=",
            path: "@"
        },
        link: function (scope,element, attrs){

            scope.$watch(attrs.pages,()=> {
                if(scope.currentPage + 10 < scope.pages) {
                    scope.forwardLink = scope.currentPage + 10;
                }
                if(scope.currentPage > 1){
                    scope.backLink = (scope.currentPage > 10) ? scope.currentPage - 10 : 1;
                }
                scope.pagesArray=[];
                var i = scope.currentPage || 1;
                for (i ; i <= scope.pages && i < scope.currentPage + 10; i++) {
                    scope.pagesArray.push(i);
                }
            });
        },
        templateUrl: "templates/shared/pagination.html"
    }
}
export=pegination;