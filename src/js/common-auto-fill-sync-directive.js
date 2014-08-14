mdl.directive("autoFillSync", ["$timeout", function($timeout) {
        return {
            require: "ngModel",
            link: function($scope, elm, attrs, ngModel) {
                var origVal = elm.val();

                $timeout(function() {
                    var newVal = elm.val();

                    if(ngModel.$pristine && origVal !== newVal) {
                        ngModel.$setViewValue(newVal);
                    }

                    elm.attr("placeholder", elm.attr("szn-placeholder"));
                    elm.val(newVal);
                }, 200);
            }
        };
}]);