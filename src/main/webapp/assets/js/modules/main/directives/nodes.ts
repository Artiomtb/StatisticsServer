function nodes(PATH_CONSTANTS) {
    return {
        restrict: "E",
        scope: {
            nodes: "=",
            nodePath: "="
        },
        templateUrl: "/templates/main/nodes.html",
        link: function (scope) {

        }
    }
}

export=nodes;