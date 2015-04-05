class MainController {
    static $inject =["$scope","$location", "$modal"];
    static get SIZE():string {return "lg"}

    constructor(private $scope, private $location, private $modal){
        this.$scope.$on('$locationChangeStart', (next, current)=> {
             this.$scope.students = current.match(/students/g);
        });
        this.help();
        this.$scope.help = this.help;
    }

    help(): any {
        this.$modal.open({
            templateUrl: '/templates/shared/help-modal.html',
            controller: 'HelpController',
            size: MainController.SIZE
        });
    }
}

export = MainController;