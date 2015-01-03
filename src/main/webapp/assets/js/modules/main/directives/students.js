define(["require", "exports"], function (require, exports) {
    function students(PATH_CONSTANTS) {
        return {
            restrict: "E",
            scope: {
                students: "=",
                path: "="
            },
            templateUrl: "/templates/main/students.html"
        };
    }
    return students;
});
//# sourceMappingURL=students.js.map