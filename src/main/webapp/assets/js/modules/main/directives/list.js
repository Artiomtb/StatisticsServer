define(["require", "exports"], function (require, exports) {
    function list(PATH_CONSTANTS) {
        return {
            restrict: "E",
            scope: {
                entries: "=",
                path: "="
            },
            templateUrl: "/templates/main/list.html"
        };
    }
    return list;
});
//# sourceMappingURL=list.js.map