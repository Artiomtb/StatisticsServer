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
                    var max = 0;
                    for (var i = 0; i < scope.materialsStats.length; i++){
                        if(scope.materialsStats[i].total_attendance > max) {
                            max = scope.materialsStats[i].total_attendance;
                        }
                    }
                    for (var i = 0; i < scope.materialsStats.length; i++) {
                        scope.data.push({});
                        scope.data[i].label = scope.materialsStats[i].material_name;
                        scope.data[i].attendance = Math.round(scope.materialsStats[i].total_attendance*100/max);
                    }
                }
            });
        },
        templateUrl: "/templates/main/materials_bar_chart.html"
    };
}

export=materialsBarChart;