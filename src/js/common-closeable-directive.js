mdl.directive("closeable", [function() {
    return {
        restrict: "A",
        link: function($scope, element, attrs) {
            var container = element[0];
            var closeButton = container.querySelector(".szn-login-close");

            var destroy = function() {
                angular.element(closeButton).unbind("click", close);
            };

            $scope.close = function(e) {
                $scope.$emit("szn-login-close-request");
            };

            angular.element(closeButton).bind("click", $scope.close);
            $scope.$on("$destroy", destroy);
        }
    };
}]);