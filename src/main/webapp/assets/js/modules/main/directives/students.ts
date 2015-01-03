function students (PATH_CONSTANTS) {
    return {
        restrict: "E",
        scope: {
            students: "=",
            path: "="
        },
        templateUrl: "/templates/main/students.html"
    }
}

export=students;