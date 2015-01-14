define(["require", "exports"], function (require, exports) {
    function Trend() {
        return {
            restrict: "E",
            scope: {
                trend: "=",
                name: "@"
            },
            templateUrl: "/templates/main/trend.html",
            link: function (scope, elementm, attrs) {
                scope.$watch('trend', function () {
                    if (scope.trend != undefined) {
                        console.log("in trend directive " + JSON.stringify(scope.trend));
                        scope.trend_data = {};
                        console.log("trend_nameassadfasdfasdfasdf " + scope.name);
                        scope.trend_data.name = scope.trendName;
                        scope.trend_data.data = {
                            labels: [],
                            datasets: [
                                {
                                    label: scope.trendName,
                                    fillColor: "rgba(151,187,205,0.5)",
                                    strokeColor: "rgba(151,187,205,0.8)",
                                    highlightFill: "rgba(151,187,205,0.75)",
                                    highlightStroke: "rgba(151,187,205,1)",
                                    data: []
                                }
                            ]
                        };
                        console.log("materials trend " + JSON.stringify(scope.materials));
                        for (var trend_idx = 0; trend_idx < scope.trend.length; trend_idx++) {
                            scope.trend_data.data.labels[trend_idx] = scope.trend[trend_idx].date;
                            scope.trend_data.data.datasets[0].data[trend_idx] = scope.trend[trend_idx].time;
                        }
                    }
                });
            }
        };
    }
    return Trend;
});
//# sourceMappingURL=trend.js.map