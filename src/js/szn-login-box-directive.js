mdl.directive("sznLoginBox", ["$animate", "$timeout", function($animate, $timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: true,
        link: function($scope, element, attrs) {
            var elm = element[0];
            var overlay = elm.querySelector(".szn-login-overlay");

            $scope.activeWindow = attrs.activewindow;

            var remove = function() {
                angular.element(elm).remove();
            };

            var onDestroy = function() {
                $animate.removeClass(overlay, "szn-login-active", remove);
            }

            $scope.setActiveWindow = function(name) {
                $scope.activeWindow = name;
            };

            $scope.$on("$destroy", onDestroy);

            $timeout(function() {
                $animate.addClass(overlay, "szn-login-active");
            });
        },
        templateUrl:"./src/html/szn-login-box.html"
    };
}]);