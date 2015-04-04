define(["require", "exports"], function (require, exports) {
    function materialsBarChart() {
        return {
            restrict: "E",
            scope: {
                materialsStats: "="
            },
            link: function (scope, element, attrs) {
                scope.$watch('materialsStats', function () {
                    if (scope.materialsStats != undefined) {
                        scope.data = [];
                        var max = 1;
                        scope.materialsStats.forEach(function (item) {
                            if (item.total_attendance > max) {
                                max = item.total_attendance;
                            }
                        });
                        for (var i = 0; i < scope.materialsStats.length; i++) {
                            scope.data.push({});
                            scope.data[i].label = scope.materialsStats[i].material_name;
                            scope.data[i].attendance = Math.round(scope.materialsStats[i].total_attendance * 100 / max);
                        }
                    }
                });
            },
            templateUrl: "/templates/main/materials_bar_chart.html"
        };
    }
    return materialsBarChart;
});
//# sourceMappingURL=materials_bar_chart.js.map