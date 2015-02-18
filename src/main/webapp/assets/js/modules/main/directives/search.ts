declare var angular;

function search() {
    return {
        restrict: "E",
        scope: {
            options: "="
        },
        templateUrl: "/templates/main/search.html",
        link: function (scope) {

            scope.searchArea = scope.options.params.filter(function (option) {
                return option.isActive;
            })[0];

            scope.activeResultHandler = scope.options.params[0].resultNavHandler;

            scope.searchText="";

            angular.element(document.getElementById("search-input")).bind("keydown", function (e) {
                if(e.which=="38" || e.which == "40" || e.which == "13") {
                    console.log(e.which);
                    if(e.which == "13") {
                        scope.search(scope.searchText);
                    }
                    e.preventDefault();
                    return;
                }

                if(scope.searchText.length > 2) {
                    getActiveOption().autocompleteHandler(scope.searchText).success(function (data){
                        scope.autocompletions = data.items;
                    }).error(function () {
                        console.log("error during autocompletion call");
                    });
                } else {
                    scope.autocompletions = [];
                }
            });

            scope.$watch("searchArea", function () {
                scope.activeResultHandler = getActiveOption().resultNavHandler;
                scope.search = getActiveOption().searchHandler;
            });

            scope.search = getActiveOption().searchHandler;

            function getActiveOption () {
                for(var i = 0; i< scope.options.params.length; i++) {
                    if(scope.searchArea.value == scope.options.params[i].value ){
                        return scope.options.params[i];
                    }
                }
                return scope.options.params[0];
            }
        }
    }
}

export=search;