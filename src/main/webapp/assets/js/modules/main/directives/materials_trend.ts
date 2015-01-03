function materialsTrend () {
    return {
        restrict: "E",
        scope: {
            materials: "="
        },
        templateUrl: "/templates/main/materials_trend.html",
        link: function (scope, elementm, attrs) {
            scope.$watch('materials', ()=> {
                if (scope.materials != undefined){
                    scope.materials_data = [];
                    for(var i =0 ; i < scope.materials.length; i++){
                        scope.materials_data[i]={};
                        scope.materials_data[i].name = scope.materials[i].material_name;
                        scope.materials_data[i].data = {
                            labels: [],
                            datasets: [
                                {
                                    label: scope.materials.material_name,
                                    fillColor: "rgba(151,187,205,0.5)",
                                    strokeColor: "rgba(151,187,205,0.8)",
                                    highlightFill: "rgba(151,187,205,0.75)",
                                    highlightStroke: "rgba(151,187,205,1)",
                                    data: []
                                }
                            ]
                        };
                        console.log("materials trend " + JSON.stringify(scope.materials));
                        for(var trend_idx = 0 ; trend_idx < scope.materials[i].trend.length; trend_idx++) {
                            scope.materials_data[i].data.labels[trend_idx] = scope.materials[i].trend[trend_idx].date;
                            scope.materials_data[i].data.datasets[0].data[trend_idx] = scope.materials[i].trend[trend_idx].time;
                        }
                    }
                }

            });
        }
    }
}

export=materialsTrend;