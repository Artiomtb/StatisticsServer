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
                    scope.data = {
                        labels: [],
                        datasets: [
                            {
                                label: "Матеріали",
                                fillColor: "rgba(151,187,205,0.5)",
                                strokeColor: "rgba(151,187,205,0.8)",
                                highlightFill: "rgba(151,187,205,0.75)",
                                highlightStroke: "rgba(151,187,205,1)",
                                data: []
                            }
                        ]
                    };
                    console.log("material stats " + JSON.stringify(scope.materialsStats));
                    for (var i = 0; i < scope.materialsStats.length; i++) {
                        scope.data.labels.push(scope.materialsStats[i].material_name);
                        scope.data.datasets[0].data.push(scope.materialsStats[i].total_attendance);
                    }
                }
            });
        },
        templateUrl: "/templates/main/materials_bar_chart.html"
    };
}

export=materialsBarChart;