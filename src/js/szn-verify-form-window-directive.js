mdl.directive("sznVerifyFormWindow", ["$timeout", "$animate", function($timeout, $animate) {
    return {
        restrict:"E",
        replace:true,
        controller: ["$scope", "sznLogin", function($scope, sznLogin) {
            var sznRegister = sznLogin.getRegister();
            var errors = {
                0: "SZN_LOGIN.VERIFY.ERROR.0",
                403: "SZN_LOGIN.VERIFY.ERROR.403",
                500: "SZN_LOGIN.VERIFY.ERROR.500"
            };

            $scope.resended = false;
            $scope.data = {
                pin:""
            };

            $scope.error = {
                msgs: []
            };

            $scope.resetError = function(statuses) {
                if (!statuses) {
                    $scope.error.msgs = [];
                }

                var sts = [].concat(statuses);
                var msgs = $scope.error.msgs.filter(function(msg) {
                    if (sts.indexOf(msg.status) > -1) {
                        return false;
                    }
                    return true;
                });

                $scope.error.msgs = msgs;
            };

            $scope.isError = function(status) {
                return $scope.error.msgs.filter(function(msg) { return msg.status == status ;}).length;
            };

            $scope.connectionError = function() {
                $scope.error.msgs.push({
                    status: 0,
                    msg: errors[0]
                });
            };

            $scope.processStatus = function(response) {
                var data = response.data;
                var status = data.status;

                $scope.resetError([0, 403, 500]);

                if (status in errors) {
                    if (!$scope.isError(status)) {
                        $scope.error.msgs.push({
                            status: status,
                            msg: errors[status]
                        });
                    }
                    return false;
                }

                return true;
            };

            $scope.submit = function(e) {
                e.preventDefault();
                var pin = $scope.data.pin;
                sznRegister.verify(pin).then(
                    function(response) {
                        var passed = $scope.processStatus(response);
                        if (passed) {
                            $scope.setActiveWindow("done-window");
                        }
                    },
                    $scope.connectionError
                );
            };

            $scope.resendCode = function(e) {
                e.preventDefault();
                sznRegister.registerRepeat();
                $scope.resended = true;
                $scope.resetError();
                $scope.data.pin = "";
            };

            $scope.$on("szn-login-active-window-changed", function(scope, values) {
                $scope.changeClasses(values.old, values.current);
            });
        }],
        link: function($scope, elements) {
            var container = elements[0];

            $scope.changeClasses = function(old) {
                if (old == "register-window") {
                    $animate.addClass(container, "from-right");
                }
            };

            $scope.changeClasses($scope.oldActiveWindow);
        },
        templateUrl:"./src/html/szn-verify-form-window.html"
    };
}]);