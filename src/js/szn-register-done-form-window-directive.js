mdl.directive("sznRegisterDoneFormWindow", ["$timeout", "$window", "$animate", function($timeout, $window, $animate) {
    return {
        restrict:"E",
        replace:true,
        controller: ["$scope", "sznLogin", function($scope, sznLogin) {
            var sznRegister = sznLogin.getRegister();
            var sznLoginBackend = sznLogin.getLogin();

            var url = $window.location.href;
            var host = url.match(/\/\/([^\/]*)/)[1];
            host = host.split(".").slice(-2).join(".");
            host = host.charAt(0).toUpperCase() + host.substring(1);
            $scope.host = host;

            $scope.loginDone = function(response) {
                var data = response.data;
                var status = data.status;

                if (status == 200) {
                    $rootScope.$broadcast("szn-login-done", {auto:false});
                }
            };

            $scope.$on("szn-login-close-request", function() {
                var values = sznRegister.getUsernameAndPassword();
                sznLoginBackend.login(values.username, values.password).then($scope.loginDone);
            });

            $scope.$on("szn-login-active-window-changed", function(scope, values) {
                $scope.changeClasses(values.old, values.current);
            });
        }],
        link: function($scope, elements, attrs) {
            var container = elements[0];

            $scope.changeClasses = function(old, newOne) {
                if (old == "register-verify-window") {
                    $animate.addClass(container, "from-right");
                }
            };

            $scope.changeClasses($scope.oldActiveWindow);
        },
        templateUrl:"./src/html/szn-register-done-form-window.html"
    };
}]);