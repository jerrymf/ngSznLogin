mdl.directive("sznLoginLicenseFormWindow", ["$window", "$animate", function($window, $animate) {
    return {
        restrict:"E",
        replace:true,
        controller: ["$scope", "sznLogin", function($scope, sznLogin) {
            var sznLoginBackend = sznLogin.getLogin();

            $scope.data = {
                agree: false
            };

            $scope.error = {
                msg: "",
                href: ""
            };

            $scope.submit = function(e) {
                e.preventDefault();
                $scope.confirmLicenseProcess();
            };

            $scope.confirmLicenseProcess = function() {
                sznLoginBackend.confirmLicence($scope.data.agree).then($scope.processStatus, $scope.processStatus);
            };

            $scope.processStatus = function(response) {
                var data = null;
                var status = 0;

                if (response) {
                    data = response.data;
                    status = data.status;
                }

                switch (status) {
                    case 200:
                        $scope.setActiveWindow(null);
                        $rootScope.$broadcast("szn-login-done", {auto:false});
                    break;
                    default:
                        $scope.error.msg = "SZN_LOGIN.LICENSE.ERROR.UNKNOWN";
                        $scope.error.href = "";
                }
            };
        }],
        link: function($scope, elements, attrs) {
            var container = elements[0];

            $scope.changeClasses = function(old, newOne) {
                if (old == "login-window") {
                    $animate.addClass(container, "from-right");
                }
            };

            $scope.changeClasses($scope.oldActiveWindow);
        },
        templateUrl:"./src/html/szn-login-license-form-window.html"
    };
}]);