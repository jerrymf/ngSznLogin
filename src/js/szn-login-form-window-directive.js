mdl.directive("sznLoginFormWindow", ["$timeout", "$interval", "$sce", "$rootScope", "sznLogin", function($timeout, $interval, $sce, $rootScope, sznLogin) {
    return {
        restrict:"E",
        replace:true,
        controller: ["$scope", function($scope) {
            var sznLoginBackend = sznLogin.getLogin();
            var sznLoginConf = sznLogin.getConf();

            $scope.titleText = $sce.trustAsHtml(sznLoginConf.text);

            $scope.data = {
                username:"",
                password:"",
                remember:false
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
                sznLoginBackend.login($scope.data.username, $scope.data.password, $scope.data.remember).then($scope.loginDone);
            };

            $scope.loginDone = function(response) {
                var data = response.data;

                switch (data.status) {
                    case 200:
                        $rootScope.$broadcast("szn-login-done", {auto:false});
                        if (sznLoginConf.autoClose) { $scope.close(); }
                    return;

                    case 201:
                        var name = $scope.data.username;
                        location.href = sznLoginBackend.getURLForOpenId(name);
                    break;

                    case 403:
                    case 406:
                        $scope.error.msg = "Neexistující uživatel nebo chybné heslo!";
                        $scope.error.href = "http://napoveda.seznam.cz/cz/login/jak-na-zapomenute-heslo/";
                    break;

                    case 405:
                        $scope.error.msg = "Váš účet je zablokován.";
                        $scope.error.href = "http://napoveda.seznam.cz/cz/login/blokace-seznam-uctu/";
                    break;

                    case 420: /* slabe, ale ne moc */
                        $scope.error.msg = "Vaše heslo je příliš jednoduché!";
                        $scope.error.weakpassword.positive = true;
                        $scope.error.weakpassword.href = sznLoginBackend.getURLForPasswordChange(data.crypted);
                    break;

                    case 421: /* moc slabe */
                        location.href = sznLoginBackend.getURLForPasswordChange(data.crypted);
                    break;

                    case 500:
                        $scope.error.msg = "Interní chyba systému.";
                        $scope.error.href = "";
                    break;

                    default:
                        $scope.error.msg = data.statusMessage;
                        $scope.error.href = "";
                    break;
                }

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
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
        }],
        link:function($scope, element, attrs) {
            var sznLoginConf = sznLogin.getConf();
            var container = element[0];
            var form = container.querySelector("#sznloginForm");
            var adElm = container.querySelector("#sznLoginAd");
            var usernameInput = container.querySelector("input[name='username']");

            var showAd = function(data) {
                var elm = angular.element(adElm);
                elm.append(data);

                if (data.indexOf("/impress?spotId") > -1) {
                    elm.addClass("adFull");
                } else {
                    elm.removeClass("adFull");
                }

                $timeout($scope.modifyPosition);
                if (!("getSelection" in window)) { // IE8 redraw fix :-/
                    $timeout($scope.modifyPosition);
                }
            };

            var onInit = function() {
                if (window.im && sznLoginConf.zoneId) {
                    var ad = {
                        zoneId: sznLoginConf.zoneId,
                        section: "/login",
                        callback: showAd
                    };
                    im.getAds([ad], true);
                    usernameInput.focus();
                }
            };

            onInit();
        },
        templateUrl:"./src/html/szn-login-form-window.html"
    };
}]);