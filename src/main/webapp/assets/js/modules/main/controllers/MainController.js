define(["require", "exports"], function (require, exports) {
    var MainController = (function () {
        function MainController($scope, $location, $modal) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$modal = $modal;
            this.help = function () {
                _this.$modal.open({
                    templateUrl: '/templates/shared/help-modal.html',
                    controller: 'HelpController',
                    size: MainController.SIZE
                });
            };
            this.$scope.$on('$locationChangeStart', function (next, current) {
                _this.$scope.students = current.match(/students/g);
            });
            console.log(localStorage.getItem("asdfasd"));
            if (localStorage.getItem("showHelp") !== "true" || localStorage.getItem("showHelp") == null) {
                this.help();
            }
            this.$scope.help = this.help;
        }
        Object.defineProperty(MainController, "SIZE", {
            get: function () {
                return "lg";
            },
            enumerable: true,
            configurable: true
        });
        MainController.$inject = ["$scope", "$location", "$modal"];
        return MainController;
    })();
    return MainController;
});
//# sourceMappingURL=MainController.js.map