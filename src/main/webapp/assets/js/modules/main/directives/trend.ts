function Trend () {
    return {
        restrict: "E",
        scope: {
            trend: "=",
            name: "@"
        },
        templateUrl: "/templates/main/trend.html",
        link: function (scope, elementm, attrs) {
            scope.$watch('trend', ()=> {
                if (scope.trend != undefined){
                    scope.trend_data={};
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
                    for(var trend_idx = 0 ; trend_idx < scope.trend.length; trend_idx++) {
                        scope.trend_data.data.labels[trend_idx] = scope.trend[trend_idx].date;
                        scope.trend_data.data.datasets[0].data[trend_idx] = scope.trend[trend_idx].time;
                    }
                }

            });
        }
    }
}

export = Trend;