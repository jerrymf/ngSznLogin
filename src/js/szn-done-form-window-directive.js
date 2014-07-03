mdl.directive("sznDoneFormWindow", ["$timeout", "$window", function($timeout, $window) {
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
        }],
        link: function($scope, element, attrs) {

        },
        templateUrl:"./src/html/szn-done-form-window.html"
    };
}]);