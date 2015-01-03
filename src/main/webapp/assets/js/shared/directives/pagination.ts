function pegination(){
    return {
        restrict: "E",
        scope: {
            pages: "=",
            path: "="
        },
        link: function (scope,element, attrs){
            scope.$watch(attrs.pages,()=>{
                scope.pagesArray=[];
                for (var i=1; i<=scope.pages; i++) {
                    scope.pagesArray.push(i);
                }
            });
        },
        templateUrl: "templates/shared/pagination.html"
    }
}
export=pegination;