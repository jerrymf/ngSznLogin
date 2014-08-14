mdl.directive("sznRegisterFormWindow", ["$timeout", "$animate", function($timeout, $animate) {
    return {
        restrict: "E",
        replace: true,
        controller: ["$scope", "sznLogin", function($scope, sznLogin) {
            var sznRegister = sznLogin.getRegister();
            var sznLoginConf = sznLogin.getConf();

            var timeoutUsernameFinished = null;
            var timeoutPasswordFinished = null;

            var usernameWatcherActivated = false;
            var passwordWatcherActivated = false;
            var passwordRepeatWatcherActivated = false;

            var redirectToRegistration = false;

            var errors = {
                0: "SZN_LOGIN.REGISTER.ERROR.0",
                404: "SZN_LOGIN.REGISTER.ERROR.404",
                406: "SZN_LOGIN.REGISTER.ERROR.406",
                420: "SZN_LOGIN.REGISTER.ERROR.420",
                421: "SZN_LOGIN.REGISTER.ERROR.421",
                422: "SZN_LOGIN.REGISTER.ERROR.422",
                423: "SZN_LOGIN.REGISTER.ERROR.423",
                424: "SZN_LOGIN.REGISTER.ERROR.424",
                425: "SZN_LOGIN.REGISTER.ERROR.425",
                426: "SZN_LOGIN.REGISTER.ERROR.426",
                427: "SZN_LOGIN.REGISTER.ERROR.427",
                430: "SZN_LOGIN.REGISTER.ERROR.430",
                431: "SZN_LOGIN.REGISTER.ERROR.431",
                500: "SZN_LOGIN.REGISTER.ERROR.500"
            };

            $scope.data = {
                username: "",
                password: "",
                passwordRepeat: "",
                acceptation:false
            };

            $scope.valid = {
                username: null,
                password: null,
                passwordPower: 0,
                passwordRepeat: null
            };

            $scope.error = {
                msgs: []
            };

            $scope.activateLoginPage = function(e) {
                e.preventDefault();
                $scope.setActiveWindow("login-window");
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

            $scope.processStatus = function(response, type) {
                var data = response.data;
                var status = data.status;

                $scope.resetError(0);
                $scope.resetError(500);

                if (type == "username") {
                    $scope.resetError([404, 427, 430, 431]);
                } else if (type == "password") {
                    $scope.resetError([406, 420, 421, 422, 423, 424]);
                } else if (type == "passwordRepeat") {
                    $scope.resetError(426);
                }

                if (status in errors) {
                    if (type == "username") {
                        redirectToRegistration = false;
                        if (status == 427) {
                            redirectToRegistration = true;
                        }
                        $scope.valid.username = false;
                    } else if (type == "password") {
                        $scope.valid.password = false;
                        $scope.valid.passwordPower = parseFloat(data.power) || 0;
                        $scope.changePasswordMeter();
                    } else if (type == "passwordRepeat") {
                        $scope.valid.passwordRepeat = false;
                    }

                    if (!$scope.isError(status)) {
                        $scope.error.msgs.push({
                            status: status,
                            msg: errors[status]
                        });
                    }

                    return false;
                }

                if (type == "username") {
                    $scope.valid.username = true;
                } else if (type == "password") {
                    $scope.valid.password = true;
                    $scope.valid.passwordPower = parseFloat(data.power) || 0;
                    $scope.changePasswordMeter();
                } else if (type == "passwordRepeat") {
                    $scope.valid.passwordRepeat = true;
                } else {
                    $scope.resetError();
                    $scope.valid.username = true;
                    $scope.valid.password = true;
                    $scope.valid.passwordRepeat = true;
                }

                return true;
            };

            $scope.connectionError = function() {
                $scope.error.msgs.push({
                    status: 0,
                    msg: errors[0]
                });
            };

            $scope.activateUsernameWatcher = function() {
                if (usernameWatcherActivated) { return; }
                $scope.$watch("data.username", $scope.checkUsername);
                usernameWatcherActivated = true;
            };

            $scope.checkUsername = function(newValue) {
                if (timeoutUsernameFinished) { $timeout.cancel(timeoutUsernameFinished); }

                timeoutUsernameFinished = $timeout(function() {
                    if (newValue) {
                        sznRegister.checkUser(newValue).then(
                            function(response) {
                                $scope.processStatus(response, "username");
                            },
                            $scope.connectionError
                        );
                    } else {
                        $scope.resetError([500, 404, 427, 430, 431]);
                        $scope.valid.username = null;
                    }
                }, 300);
            };

            $scope.activatePasswordWatcher = function() {
                if (passwordWatcherActivated) { return; }
                $scope.$watch("data.password", $scope.checkPassword);
                passwordWatcherActivated = true;
            };

            $scope.checkPassword = function(newValue) {
                if ($scope.data.passwordRepeat) {
                    $scope.checkPasswordRepeat($scope.data.passwordRepeat);
                }

                if (timeoutPasswordFinished) { $timeout.cancel(timeoutPasswordFinished); }

                timeoutPasswordFinished = $timeout(function() {
                    if (newValue) {
                        sznRegister.checkPassword(newValue).then(
                            function(response) {
                                $scope.processStatus(response, "password");
                            },
                            $scope.connectionError
                        );
                    } else {
                        $scope.resetError([500, 406, 420, 421, 422, 423, 424]);
                        $scope.valid.password = null;
                        $scope.valid.passwordPower = 0;
                        $scope.changePasswordMeter();
                    }
                }, 300);
            };

            $scope.activatePasswordRepeatWatcher = function() {
                if (passwordRepeatWatcherActivated) { return; }
                $scope.$watch("data.passwordRepeat", $scope.checkPasswordRepeat);
                passwordRepeatWatcherActivated = true;
            };

            $scope.checkPasswordRepeat = function(newValue) {
                if (!newValue) {
                    $scope.valid.passwordRepeat = null;
                    $scope.resetError([500, 426]);
                    return;
                }

                if (newValue != $scope.data.password) {
                    $scope.processStatus({data:{status:426}}, "passwordRepeat");
                    return;
                }

                $scope.processStatus({data:{status:200}}, "passwordRepeat");
            };

            $scope.submit = function(e) {
                e.preventDefault();
                if (!$scope.data.acceptation) { return; }

                var username = $scope.data.username;
                var password1 = $scope.data.password;
                var password2 = $scope.data.passwordRepeat;

                if (redirectToRegistration) {
                    var url = sznLoginConf.registerUrl;
                    var parts = username.split("@");
                    url += "/?username=" + encodeURIComponent(parts[0]) + "&domain=" + encodeURIComponent(parts[1]);
                    location.href = url;
                    return;
                }

                sznRegister.register(username, password1, password2).then(
                    function(response) {
                        var passed = $scope.processStatus(response);
                        if (passed) {
                            $scope.setActiveWindow("verify-window");
                        }
                    },
                    $scope.connectionError
                );
            };

            $scope.$on("szn-login-active-window-changed", function(scope, values) {
                $scope.changeClasses(values.old, values.current);
            });
        }],
        link: function($scope, element) {
            var container = element[0];
            var passwordMeter = container.querySelector("#passwordMeter span");

            $scope.changePasswordMeter = function() {
                var power = $scope.valid.passwordPower;
                var c1 = [238, 14, 14];
                var c2 = [157, 201, 48];
                var c = c1.slice();

                for (var i=0;i<3;i++) {
                    c[i] += Math.round((c2[i]-c1[i])*power/100);
                }

                passwordMeter.style.backgroundColor = "rgb("+c.join(",")+")";
                passwordMeter.style.width = power + "%";
            };

            $scope.changeClasses = function(old, current) {
                if (current == "login-window") {
                    $animate.addClass(container, "to-right");
                }

                if (current == "verify-window") {
                    $animate.addClass(container, "to-left");
                }

                if (old == "login-window") {
                    $animate.addClass(container, "from-right");
                }
            };

            $scope.changeClasses($scope.oldActiveWindow);
        },
        templateUrl:"./src/html/szn-register-form-window.html"
    };
}]);