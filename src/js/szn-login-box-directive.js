mdl.directive("sznLoginBox", ["$animate", "$timeout", function($animate, $timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: true,
        link: function($scope, element, attrs) {
            var elm = element[0];
            var overlay = elm.querySelector(".szn-login-overlay");

            $scope.oldActiveWindow = null;
            $scope.activeWindow = attrs.activewindow;

            var remove = function() {
                angular.element(elm).remove();
            };

            var onDestroy = function() {
                $scope.oldActiveWindow = null;
                $scope.activeWindow = null;
                $animate.removeClass(overlay, "szn-login-active", remove);

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }

            $scope.setActiveWindow = function(name) {
                $scope.oldActiveWindow = $scope.activeWindow;
                $scope.activeWindow = name;
                $scope.$broadcast("szn-login-active-window-changed", {old:$scope.oldActiveWindow, current:$scope.activeWindow});
            };

            $scope.$on("$destroy", onDestroy);

            $timeout(function() {
                $animate.addClass(overlay, "szn-login-active");
            });
        },
        templateUrl:"./src/html/szn-login-box.html"
    };
}]);