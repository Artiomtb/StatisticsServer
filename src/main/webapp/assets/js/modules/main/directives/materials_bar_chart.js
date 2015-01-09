define(["require", "exports"], function (require, exports) {
    function materialsBarChart() {
        return {
            restrict: "E",
            scope: {
                materialsStats: "="
            },
            link: function (scope, element, attrs) {
                scope.$watch('materialsStats', function () {
                    console.log("mat stats " + typeof attrs.materialsStats);
                    if (scope.materialsStats != undefined) {
                        scope.data = [];
                        var max = 0;
                        for (var i = 0; i < scope.materialsStats.length; i++) {
                            if (scope.materialsStats[i].total_attendance > max) {
                                max = scope.materialsStats[i].total_attendance;
                            }
                        }
                        console.log("material stats " + JSON.stringify(scope.materialsStats));
                        for (var i = 0; i < scope.materialsStats.length; i++) {
                            scope.data.push({});
                            scope.data[i].label = scope.materialsStats[i].material_name;
                            scope.data[i].attendance = Math.round(scope.materialsStats[i].total_attendance * 100 / max);
                        }
                        console.log("data in " + JSON.stringify(scope.data));
                    }
                });
            },
            templateUrl: "/templates/main/materials_bar_chart.html"
        };
    }
    return materialsBarChart;
});
//# sourceMappingURL=materials_bar_chart.js.map