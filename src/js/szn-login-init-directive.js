mdl.directive("sznLoginInit", ["sznLogin", function(sznLogin) {
    return {
        restrict:"A",
        controller:["$scope", "$rootScope", function($scope, $rootScope) {
            var sznLoginBackend = sznLogin.getLogin();
            sznLoginBackend.check().then(function(logged) {
                var conf = sznLogin.getConf();

                if (!logged) { return; }
                if (!conf.autoLogin) { return; }

                sznLoginBackend.autologin().then(function(response) {
                    var data = response.data;
                    if (data.status == 200) {
                        $rootScope.$broadcast("szn-login-done", {auto:true});
                    }
                });
            });
        }],
        link:function($scope, element, attrs) {
            angular.element(element[0]).bind("click", function(e) {
                e.preventDefault();
                sznLogin.open();
            });
        }
    };
}]);
