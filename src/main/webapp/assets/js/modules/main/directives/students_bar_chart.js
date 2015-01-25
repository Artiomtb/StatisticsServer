define(["require", "exports"], function (require, exports) {
    function studentsBarChart() {
        return {
            restrict: "E",
            scope: {
                trend: "="
            },
            link: function (scope, element, attrs) {
                scope.$watch(attrs.trend, function () {
                    if (scope.trend != undefined) {
                        scope.data = [];
                        var max = 0;
                        for (var i = 0; i < scope.trend.length; i++) {
                            if (scope.trend[i].total_attendance > max) {
                                max = scope.trend[i].total_attendance;
                            }
                        }
                        for (var i = 0; i < scope.trend.length; i++) {
                            scope.data.push({});
                            scope.data[i].label = scope.trend[i].party_name;
                            scope.data[i].attendance = Math.round(scope.trend[i].total_attendance * 100 / max);
                        }
                    }
                });
            },
            templateUrl: "/templates/main/students_bar_chart.html"
        };
    }
    return studentsBarChart;
});
//# sourceMappingURL=students_bar_chart.js.map