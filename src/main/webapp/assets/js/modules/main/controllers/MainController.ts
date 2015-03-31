class MainController {
    static $inject =["$scope","$location"];

    constructor(private $scope, private $location){
        this.$scope.$on('$locationChangeStart', (next, current)=> {
             this.$scope.students = current.match(/students/g);
        });
    }
}

export= MainController;