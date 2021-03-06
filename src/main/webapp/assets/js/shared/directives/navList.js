define(["require", "exports"], function (require, exports) {
    function navList() {
        return {
            restrict: "E",
            scope: {
                boldText: "@",
                path: "@",
                list: "=",
                current: "=",
                show: "="
            },
            templateUrl: "templates/shared/nav_list.html",
            link: function (scope, element) {
                scope.currentActive = 0;
                angular.element(document).bind("keydown", function (event) {
                    scope.$apply(function () {
                        if (event.which == 40) {
                            moveCursorDown();
                        }
                        else if (event.which == 38) {
                            moveCursorUp();
                        }
                    });
                });
                function moveCursorDown() {
                    if (scope.list && scope.list.length > scope.currentActive + 1) {
                        scope.current = scope.list[++scope.currentActive].name;
                    }
                }
                function moveCursorUp() {
                    if (scope.currentActive && scope.currentActive != 0) {
                        scope.current = scope.list[--scope.currentActive].name;
                    }
                }
            }
        };
    }
    return navList;
});
//# sourceMappingURL=navList.js.map