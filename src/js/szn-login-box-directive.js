mdl.directive("sznLoginBox", function() {
    return {
        restrict: "E",
        replace: true,
        scope: true,
        link: function($scope, element, attrs) {
            var container = angular.element(element[0]);
            $scope.activeWindow = attrs.activewindow;

            var destroy = function() {
                container.remove();
            };

            $scope.setActiveWindow = function(name) {
                $scope.activeWindow = name;
            };

            $scope.$on("$destroy", destroy);
        },
        templateUrl:"./src/html/szn-login-box.html"
    };
});