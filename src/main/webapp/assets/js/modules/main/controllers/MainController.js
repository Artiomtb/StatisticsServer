define(["require", "exports"], function (require, exports) {
    var MainController = (function () {
        function MainController($scope, $location) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$scope.test = "test";
            this.$scope.$on('$locationChangeStart', function (next, current) {
                console.log("this scioe" + _this.$scope.test);
                _this.$scope.students = current.match(/students/g);
            });
        }
        MainController.$inject = ["$scope", "$location"];
        return MainController;
    })();
    return MainController;
});
//# sourceMappingURL=MainController.js.map