mdl.directive("closeable", [function() {
    return {
        restrict: "A",
        link: function($scope, element, attrs) {
            var container = element[0];
            var closeButton = container.querySelector(".szn-login-close");

            var onKeyup = function(e) {
                var keycode = e.keycode || e.which;
                if (keycode == 27) {
                    $scope.close();
                }
            };

            var destroy = function() {
                angular.element(closeButton).unbind("click", close);
                angular.element(window).unbind("keyup", onKeyup);
            };

            $scope.close = function(e) {
                $scope.$emit("szn-login-close-request");
            };

            angular.element(closeButton).bind("click", $scope.close);
            angular.element(window).bind("keyup", onKeyup);
            $scope.$on("$destroy", destroy);
        }
    };
}]);