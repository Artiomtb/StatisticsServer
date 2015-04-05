define(["require", "exports"], function (require, exports) {
    var HelpController = (function () {
        function HelpController($scope, $modalInstance) {
            $scope.ok = function () {
                $modalInstance.close();
            };
            //$scope.dont_show_window =
        }
        HelpController.$inject = ["$scope", "$modalInstance"];
        return HelpController;
    })();
    return HelpController;
});
//# sourceMappingURL=HelpController.js.map