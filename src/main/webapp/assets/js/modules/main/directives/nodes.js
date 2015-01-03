define(["require", "exports"], function (require, exports) {
    function nodes(PATH_CONSTANTS) {
        return {
            restrict: "E",
            scope: {
                nodes: "=",
                nodePath: "="
            },
            templateUrl: "/templates/main/nodes.html",
            link: function (scope) {
                console.log("directives " + scope.nodePath);
            }
        };
    }
    return nodes;
});
//# sourceMappingURL=nodes.js.map