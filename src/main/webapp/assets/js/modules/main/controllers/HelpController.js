define(["require", "exports"], function (require, exports) {
    var HelpController = (function () {
        function HelpController($scope, $modalInstance) {
            $scope.showHelp = localStorage.getItem("showHelp") === "true";
            $scope.ok = function () {
                localStorage.removeItem("showHelp");
                localStorage.setItem("showHelp", $scope.showHelp);
                $modalInstance.close();
            };
        }
        HelpController.$inject = ["$scope", "$modalInstance"];
        return HelpController;
    })();
    return HelpController;
});
//# sourceMappingURL=HelpController.js.map