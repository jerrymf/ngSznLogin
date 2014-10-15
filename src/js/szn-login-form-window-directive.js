mdl.directive("sznLoginFormWindow", ["$timeout", "$interval", "$animate", "$rootScope", "sznLogin", function($timeout, $interval, $animate, $rootScope, sznLogin) {
    return {
        restrict:"E",
        replace:true,
        controller: ["$scope", function($scope) {
            var sznLoginBackend = sznLogin.getLogin();
            var sznLoginConf = sznLogin.getConf();

            $scope.loading = false;

            $scope.text = (sznLoginConf.multilingualText[sznLoginConf.language] || {})[sznLoginConf.multilingualTextId] || "";

            $scope.data = {
                username:"",
                password:"",
                remember:true
            };

            $scope.error = {
                cookieDisabled: false,
                weakpassword: {
                    positive: false,
                    href:""
                },
                msg: "",
                href: ""
            };

            $scope.resetError = function() {
                $scope.error = {
                    weakpassword: {
                        positive: false,
                        href:""
                    },
                    msg: "",
                    href: ""
                };
            };

            $scope.submit = function(e) {
                e.preventDefault();
                $scope.loginProcess();
            };

            $scope.loginProcess = function() {
                if ($scope.loading) { return; }

                $scope.loading = true;

                $scope.resetError();
                sznLoginBackend.login($scope.data.username, $scope.data.password, $scope.data.remember).then(
                    $scope.loginDone,
                    $scope.loginError
                );
            };

            $scope.loginDone = function(response) {
                $scope.loading = false;

                var data = response.data;

                switch (data.status) {
                    case 200:
                        $scope.setActiveWindow(null);
                        $rootScope.$broadcast("szn-login-done", {auto:false});
                    return;

                    case 201:
                        var name = $scope.data.username;
                        location.href = sznLoginBackend.getURLForOpenId(name);
                    break;

                    case 403:
                    case 406:
                        $scope.error.msg = "SZN_LOGIN.LOGIN.ERROR.BAD_LOGIN";
                        $scope.error.href = "http://napoveda.seznam.cz/cz/login/jak-na-zapomenute-heslo/";
                    break;

                    case 405:
                        $scope.error.msg = "SZN_LOGIN.LOGIN.ERROR.FORBIDDEN";
                        $scope.error.href = "http://napoveda.seznam.cz/cz/login/blokace-seznam-uctu/";
                    break;

                    case 420: /* slabe, ale ne moc */
                        $scope.error.msg = "SZN_LOGIN.LOGIN.ERROR.WEAK_PASSWORD";
                        $scope.error.weakpassword.positive = true;
                        $scope.error.weakpassword.href = sznLoginBackend.getURLForPasswordChange(data.crypted);
                    break;

                    case 421: /* moc slabe */
                        location.href = sznLoginBackend.getURLForPasswordChange(data.crypted);
                    break;

                    case 500:
                        $scope.error.msg = "SZN_LOGIN.LOGIN.ERROR.INTERNAL";
                        $scope.error.href = "";
                    break;

                    default:
                        $scope.error.msg = data.statusMessage;
                        $scope.error.href = "";
                    break;
                }
            };

            $scope.loginError = function() {
                $scope.loading = false;
                $scope.error.msg = "SZN_LOGIN.LOGIN.ERROR.CONNECTION";
            };

            $scope.continueWithWeakPassword = function(e) {
                e.preventDefault();
                $scope.resetError();
                sznLogin.continueWithWeakPassword().then($scope.loginDone);
            };

            $scope.activateRegisterPage = function(e) {
                e.preventDefault();
                $scope.setActiveWindow("register-window");
            };

            if (sznLoginConf.checkCookie) {
                var checkCookie = function() {
                    $scope.error.cookieDisabled = false;
                    if (("cookieEnabled" in navigator) && !navigator.cookieEnabled) { $scope.error.cookieDisabled = true; }
                };
                $interval(checkCookie, 1000);
                checkCookie();
            }

            $scope.$on("szn-login-active-window-changed", function(scope, values) {
                $scope.changeClasses(values.old, values.current);
            });
        }],
        link:function($scope, element) {
            var sznLoginConf = sznLogin.getConf();
            var container = element[0];
            var adElm = container.querySelector("#sznLoginAd");

            var html = "";
            var impress = false;

            var showAd = function(data) {
                if (typeof data  == "string") { /* im2.js */
                    html = data;
                    impress = html.indexOf("/impress?spotId") > -1;
                } else { /* im3.js  */
                    impress = !!data.impress;
                    while(data.spots.length) {
                        var spot = data.spots.shift();
                        html += spot.content;
                    }
                }

                var elm = angular.element(adElm);
                elm.append(html);

                if (impress) {
                    elm.addClass("adFull");
                } else {
                    elm.removeClass("adFull");
                }

                $timeout($scope.modifyPosition);
                if (!("getSelection" in window)) { // IE8 redraw fix :-/
                    $timeout($scope.modifyPosition);
                }
            };

            var callAd = function() {
                if (window.im && sznLoginConf.zoneId) {
                    var ad = {
                        zoneId: sznLoginConf.zoneId,
                        section: "/login",
                        callback: showAd
                    };
                    window.im.getAds([ad], true);
                }
            };

            $scope.changeClasses = function(old, current) {
                if (current == "register-window") {
                    $animate.addClass(container, "to-left");
                }

                if (old == "register-window") {
                    $animate.addClass(container, "from-left");
                }
            };

            callAd();
            $scope.changeClasses($scope.oldActiveWindow);
        },
        templateUrl:"./src/html/szn-login-form-window.html"
    };
}]);