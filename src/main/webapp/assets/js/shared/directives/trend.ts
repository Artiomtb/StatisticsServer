function trend(){
    return {
        restrict: "E",
        scope: {
            df: "=",
            header: "@"
        },
        link: function (scope,element, attrs){
            scope.header = scope.header || "Загальна статистика";
            scope.$watch('df',()=>{
                if (scope.df) {
                    var data = [];
                    var labels = [];
                    for(var i =0;i< scope.df.length;i++) {
                        labels.push(scope.df[i].date);
                        data.push(scope.df[i].time);
                    }
                    scope.data={
                        labels: labels,
                        datasets: [{
                            label: "My Second dataset",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: data
                        }]
                    }
                }

            });
        },
        templateUrl: "/templates/shared/trend.html"
    }
}
export=trend;