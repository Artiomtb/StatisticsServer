define(["require", "exports"], function (require, exports) {
    function list(PATH_CONSTANTS) {
        return {
            restrict: "E",
            scope: {
                headers: "=",
                path: "="
            },
            templateUrl: "/templates/main/students.html"
        };
    }
    return list;
});
//# sourceMappingURL=list.js.map