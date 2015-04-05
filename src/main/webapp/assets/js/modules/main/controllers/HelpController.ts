class HelpController {
    static $inject = ["$scope", "$modalInstance" ];
    constructor($scope, $modalInstance){
        $scope.ok = ()=> {
            $modalInstance.close();
        }
        //$scope.dont_show_window =
    }
}

export=HelpController;