function list (PATH_CONSTANTS) {
    return {
        restrict: "E",
        scope: {
            headers: "=",
            path: "="
        },
        templateUrl: "/templates/main/students.html"
    }
}

export=list;