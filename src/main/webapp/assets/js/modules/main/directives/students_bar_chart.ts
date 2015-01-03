function studentsBarChart() {
    return {
        restrict: "E",
        scope: {
            trend: "="
        },
        link: function (scope,element, attrs) {
            scope.$watch(attrs.trend, ()=>{
                if (scope.trend != undefined) {
                    console.log("bar char trend " + JSON.stringify(scope.trend));
                    scope.data = {
                        labels: [],
                        datasets: [
                            {
                                label: "Students Attendance",
                                fillColor: "rgba(151,187,205,0.5)",
                                strokeColor: "rgba(151,187,205,0.8)",
                                highlightFill: "rgba(151,187,205,0.75)",
                                highlightStroke: "rgba(151,187,205,1)",
                                data: []
                            }
                        ]
                    };
                    console.log(scope.data.datasets.data);
                    for (var i = 0; i < scope.trend.length; i++) {
                        scope.data.labels.push(scope.trend[i].party_name);
                        scope.data.datasets[0].data.push(scope.trend[i].total_attendance);
                    }
                }
            })
        },
        templateUrl: "/templates/main/students_bar_chart.html"
    }
}

export = studentsBarChart;