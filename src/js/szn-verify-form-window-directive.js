mdl.directive("sznVerifyFormWindow", ["$timeout", function($timeout) {
    return {
        restrict:"E",
        replace:true,
        controller: ["$scope", "sznLogin", function($scope, sznLogin) {
            var sznRegister = sznLogin.getRegister();
            var errors = {
                403: "Zadaný kód je neplatný",
                500: "Interní chyba systému"
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

            $scope.processStatus = function(response) {
                var data = response.data;
                var status = data.status;

                $scope.resetError([403, 500]);

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
                sznRegister.verify(pin).then(function(response) {
                    var passed = $scope.processStatus(response);
                    if (passed) {
                        $scope.setActiveWindow("done-window");
                    }
                    $scope.$apply();
                });
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
        link: function($scope, elements, attrs) {
            var container = elements[0];

            $scope.changeClasses = function(old, current) {
                if (old == "register-window") {
                    angular.element(container).addClass("from-right");
                }
            };

            $scope.changeClasses($scope.oldActiveWindow);
        },
        templateUrl:"./src/html/szn-verify-form-window.html"
    };
}]);