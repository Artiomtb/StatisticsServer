declare var localStorage;

class HelpController {
    static $inject = ["$scope", "$modalInstance" ];
    constructor($scope, $modalInstance){
        $scope.showHelp = localStorage.getItem("showHelp") === "true";
        $scope.ok = ()=> {
            localStorage.removeItem("showHelp");
            localStorage.setItem("showHelp", $scope.showHelp);
            $modalInstance.close();
        }
    }
}

export=HelpController;