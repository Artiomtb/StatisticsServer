define(["require", "exports"], function (require, exports) {
    function search($location) {
        return {
            restrict: "E",
            scope: {
                options: "="
            },
            templateUrl: "/templates/main/search.html",
            link: function (scope) {
                //hide id click on body
                angular.element(document).bind('click', function (event) {
                    if (event.target != document.getElementById("search-input")) {
                        scope.$apply(function () {
                            scope.showAutocompetions = false;
                        });
                    }
                });
                scope.searchArea = scope.options.params.filter(function (option) {
                    return option.isActive;
                })[0];
                scope.searchText = scope.options.defaultValue;
                //scope.showAutocompetions = scope.options.params[0].resultNavHandler;
                angular.element(document.getElementById("search-input")).bind("keyup", function (e) {
                    if (e.which == "38" || e.which == "40" || e.which == "13") {
                        if (e.which == "13") {
                            scope.search(scope.searchText);
                        }
                        e.preventDefault();
                        return;
                    }
                    if (scope.searchText.length > 2) {
                        scope.activeText = scope.searchText;
                        getActiveOption().autocompleteHandler(scope.searchText).success(function (data) {
                            scope.showAutocompetions = true;
                            scope.autocompletions = data.items;
                        }).error(function () {
                            console.log("error during autocompletion call");
                        });
                    }
                    else {
                        scope.autocompletions = [];
                    }
                });
                scope.$watch("searchArea", function () {
                    scope.activeResultPath = getActiveOption().resultNavPath;
                });
                function getActiveOption() {
                    for (var i = 0; i < scope.options.params.length; i++) {
                        if (scope.searchArea.value == scope.options.params[i].value) {
                            return scope.options.params[i];
                        }
                    }
                    return scope.options.params[0];
                }
            }
        };
    }
    return search;
});
//# sourceMappingURL=search.js.map