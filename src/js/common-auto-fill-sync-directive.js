mdl.directive("autoFillSync", ["$timeout", function($timeout) {
    return {
      require: "ngModel",
      link: function($scope, elem, attrs, ngModel) {
          var origVal = elem.val();
          $timeout(function() {
              var newVal = elem.val();
              if(ngModel.$pristine && origVal !== newVal) {
                  ngModel.$setViewValue(newVal);
              }
          }, 200);
      }
    };
}]);