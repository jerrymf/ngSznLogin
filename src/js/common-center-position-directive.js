mdl.directive("centerPosition", ["$timeout", "$window", function($timeout, $window) {
    return {
        rectrict:"A",
        link: function($scope, elements, attrs) {
            var container = elements[0];

            var destroy = function() {
                angular.element($window).unbind("resize", $scope.modifyPosition);
            };

            var onInit = function() {
                angular.element(container).removeClass("hidden");
                $scope.modifyPosition();
            };

            $scope.modifyPosition = function(e) {
                var viewPortWidth = $window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var viewPortHeight = $window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                var w = container.offsetWidth;
                var h = container.offsetHeight;
                var l = Math.round(viewPortWidth/2-w/2);
                var t = Math.round(viewPortHeight/2.5-h/2);
                container.style.left = Math.max(0, l) + "px";
                container.style.top = Math.max(24, t) + "px";
            };

            angular.element($window).bind("resize", $scope.modifyPosition);
            $scope.$on("$destroy", destroy);

            $timeout(onInit);
        }
    };
}]);