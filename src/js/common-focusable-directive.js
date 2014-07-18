mdl.directive("focusable", ["$timeout", function($timeout) {
    return {
        restrict:"A",
        link: function($scope, elements, attrs) {
            var elm = elements[0];
            $timeout(function() {
                elm.focus();
            }, 25);
        }
    };
}]);