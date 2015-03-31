function list (PATH_CONSTANTS) {
    return {
        restrict: "E",
        scope: {
            entries: "=",
            path: "="
        },
        templateUrl: "/templates/main/list.html"
    }
}

export=list;