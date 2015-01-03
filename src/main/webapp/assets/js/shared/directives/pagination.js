define(["require", "exports"], function (require, exports) {
    function pegination() {
        return {
            restrict: "E",
            scope: {
                pages: "=",
                path: "="
            },
            link: function (scope, element, attrs) {
                scope.$watch(attrs.pages, function () {
                    scope.pagesArray = [];
                    for (var i = 1; i <= scope.pages; i++) {
                        scope.pagesArray.push(i);
                    }
                });
            },
            templateUrl: "templates/shared/pagination.html"
        };
    }
    return pegination;
});
//# sourceMappingURL=pagination.js.map