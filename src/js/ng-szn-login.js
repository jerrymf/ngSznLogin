(function(win, angular){
    "use strict";

    if (!win || !angular) {
        throw new Error("ngSznLogin: I did not found angular. Init failed.");
    }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1);
            var fToBind = this;
            var FNOP = function () {};
            var fBound = function () {
                return fToBind.apply(this instanceof FNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

            FNOP.prototype = this.prototype;
            fBound.prototype = new FNOP();

            return fBound;
        };
    }

    var DEF_LOGIN_URL = "https://login.szn.cz";
    var DEF_REGISTER_URL = "https://registrace.seznam.cz";
    var DEF_SERVICE_ID = "email";

    var mdl = angular.module("ngSznLogin", ["ng"]);

    var inj = angular.injector(["ng"]);
    var $el = angular.element;
    var $http = inj.get("$http");
    var $q = inj.get("$q");

    var LoginTransport = null;

    document.createElement("szn-login-box");
    document.createElement("szn-login-form-window");
    document.createElement("szn-register-form-window");
    document.createElement("szn-verify-form-window");
    document.createElement("szn-done-form-window");


    var LoginRequest = function(url) {
        this._url = url;
    };

    LoginRequest.isSupported = window.XMLHttpRequest && ("withCredentials" in new XMLHttpRequest()) && ("MozTransition" in document.createElement("div").style);

    LoginRequest.prototype.get = function(method, params) {
        var url = this._url + method;
        return this._send("GET", url, params);
    };

    LoginRequest.prototype.post = function(method, params) {
        var url = this._url + method;
        return this._send("POST", url, params);
    };

    LoginRequest.prototype._send = function(method, url, params) {
        if (method == "POST") {
             var data = [];

            for (var i in params) {
                data.push(i + "=" + encodeURIComponent(params[i]));
            }

            return $http({
                method:method,
                url:url,
                data:data.join("&"),
                withCredentials: true,
                headers: {"Accept": "application/json", "Content-Type":"application/x-www-form-urlencoded" }
            });
        } else {
            return $http({
                method:method,
                url:url,
                params:params,
                withCredentials: true,
                headers: {"Accept": "application/json", "Content-Type":"application/x-www-form-urlencoded" }
            });
        }
    };


    var LoginIframe = function(url) {
        var loginDomain = url.match(/\/\/([^.]+)/)[1];
        var curretDomain = window.location.hostname.split(".").slice(-2).join(".");

        this._origins = [
            url,
            "http://" + loginDomain + "." + curretDomain
        ];

        this._url = url;
        this._id = "sznLoginIframe" + (new Date().getTime() - Math.round(Math.random() * 10000000));
        this._iframe = this._buildIframe();
        this._deferred = null;
        this._onMessage = this._onMessage.bind(this);

        $el(window).bind("message", this._onMessage);
    };

    LoginIframe.isSupported = !!window.postMessage;

    LoginIframe.prototype.get = function(method, params) {
        this._deferred = $q.defer();

        var url = this._url + method;
        var arr = [];

        for (var name in params) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(params[name]));
        }

        this._iframe.src = url + "?" + arr.join("&");

        return this._deferred.promise;

    };

    LoginIframe.prototype.post = function(method, params) {
        this._deferred = $q.defer();

        var url = this._url + method;

        var form = document.createElement("form");
        form.method = "POST";
        form.target = this._id;
        form.action = url;

        for (var name in params) {
            var value = params[name];

            var input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;

            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        form.parentNode.removeChild(form);

        return this._deferred.promise;
    };

    LoginIframe.prototype._buildIframe = function() {
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = '<iframe name="' + this._id + '"></iframe>';
        var iframe = tempDiv.firstChild;
        iframe.style.display = "none";
        document.body.insertBefore(iframe, document.body.firstChild);
        return iframe;
    };

    LoginIframe.prototype._onMessage = function(e) {
        if (!this._isAllowedUrl(e.origin)) { return; }

        var deferred = this._deferred;
        this._deferred = null;
        deferred.resolve({data:JSON.parse(e.data)});
    };

    LoginIframe.prototype._isAllowedUrl = function(url) {
        var re = /\/\/([^\/]+)/;
        url = url.match(re)[1];
        if (!url) { return false; }

        for (var i = 0, len = this._origins.length; i < len; i++) {
            var origin = this._origins[i].match(re)[1];
            if (origin == url) {
                return true;
            }
        }

        return false;
    };

    if (LoginRequest.isSupported) {
        LoginTransport = LoginRequest;
    } else if (LoginIframe.isSupported) {
        LoginTransport = LoginIframe;
    } else {
        throw new Error("ngSznLogin: There is no supported login method.");
    }

    var Login = function(conf) {
        this._conf = {
            url: "",
            serviceId: "",
            returnURL: ""
        };

        this._methods = {
            status: "/beta/status",
            login: "/beta/login",
            autologin: "/beta/autologin",
            acceptweak: "/beta/acceptweak",
            change: "/changeScreen",
            openId: "/loginOIProcess"
        };

        for (var i in conf) {
            var value = conf[i];
            if (value) {
                this._conf[i] = value;
            }
        }

        this._transport = new LoginTransport(this._conf.url);
        this._cookie = true;
    };

    Login.prototype.check = function() {
        var check = $q.defer();
        var data = this._getCommonData();

        this._transport.get(this._methods.status, data).then(function(response) {
            var data = response.data;
            this._cookie = data.cookie;
            check.resolve(data.logged);
        }.bind(this));

        return check.promise;
    };

    Login.prototype.autologin = function() {
        var data = this._getCommonData();

        return this._transport.get(this._methods.autologin, data);
    };

    Login.prototype.continueWithWeakPassword = function() {
        var data = this._getCommonData();

        return this._transport.get(this._methods.acceptweak, data);
    };

    Login.prototype.getURLForPasswordChange = function(crypted) {
        var data = this._getCommonData();
        data.cPassPower = crypted;

        var arr = [];
        for (var p in data) { arr.push(p + "=" + encodeURIComponent(data[p])); }

        return this._conf.url + this._methods.change + "?" + arr.join("&");
    };

    Login.prototype.getURLForOpenId = function(openId) {
        var data = this._getCommonData();
        data.openid = openId;

        var arr = [];
        for (var p in data) { arr.push(p + "=" + encodeURIComponent(data[p])); }

        return this._conf.url + this._methods.openId + "?" + arr.join("&");
    };

    Login.prototype.login = function(name, pass, remember) {
        var defered = $q.defer();

        var data = this._getCommonData();
        data.user = name;
        data.password = pass;
        data.remember = (remember ? 1 : 0);
        data.ajax = (this._cookie ? 1 : 0);

        if (!this._cookie) {
            var form = document.createElement("form");
            form.method = "post";
            form.action = this._conf.url + this._methods.login;

            for (var p in data) {
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = p;
                input.value = data[p];

                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            return defered.promise;
        }

        this._transport.post(this._methods.login, data).then(function(response) {
            var data = response.data;
            defered.resolve({data:data});
        });

        return defered.promise;
    };

    Login.prototype._getCommonData = function() {
        return {
            serviceId: this._conf.serviceId,
            returnURL: this._conf.returnURL || win.location.href
        };
    };

    var Register = function(conf) {
        this._methods = {
            passwordcheck: "/beta/passwordcheck",
            usercheck: "/beta/usercheck",
            registration: "/beta/registration",
            verifypin: "/beta/verifypin"
        };

        this._conf = {
            url: "",
            serviceId: "",
            returnURL: ""
        };

        this._current = null;

        for (var p in conf) { this._conf[p] = conf[p]; }

        this._transport = new LoginTransport(this._conf.url);
    };

    Register.prototype.checkPassword = function(password) {
        var data = this._commonData();
        data.password = password;

        return this._transport.post(this._methods.passwordcheck, data);
    };

    Register.prototype.checkUser = function(username) {
        var data = this._commonData();
        data.user = username;

        return this._transport.get(this._methods.usercheck, data);
    };

    Register.prototype.register = function(user, password, password2) {
        this._current = this._commonData();
        this._current.user = user;
        this._current.password = password;
        this._current.password2 = password2;
        this._current.cud = "";
        return this._transport.post(this._methods.registration, this._current).then(this._setCud.bind(this));
    };

    Register.prototype.registerRepeat = function() {
        return this.register(this._current.user, this._current.password, this._current.password2);
    };

    Register.prototype.getUsernameAndPassword = function() {
        return {
            username: this._current.user,
            password: this._current.password
        };
    };

    Register.prototype.verify = function(pin) {
        var data = this._commonData();
        data.cud = this._current.cud;
        data.pin = pin;

        return this._transport.post(this._methods.verifypin, data);
    };

    Register.prototype._commonData = function() {
        return {
            serviceId: this._conf.serviceId,
            returnURL: this._conf.returnURL || win.location.href
        };
    };

    Register.prototype._setCud = function(response) {
        if (response && response.data && response.data.status == 200) {
            this._current.cud = response.data.cud;
        }

        return response;
    };

    mdl.provider("sznLogin", function() {
        var conf = {
            url:"",
            serviceId:"",
            returnURL: "",
            text: "<strong>Přihlaste se</strong> tam, kam se dosud nikdo nevydal.",
            autoClose: true,
            autoLogin: true,
            checkCookie: false,
            zoneId: "seznam.pack.rectangle"
        };

        this.config = function(obj) {
            for (var i in obj) {
                conf[i] = obj[i];
            }
        };

        this.$get = ["$compile", "$rootScope", function($compile, $rootScope) {
            var loginConf = {
                url: conf.url || DEF_LOGIN_URL,
                serviceId: conf.serviceId || DEF_SERVICE_ID,
                returnURL: conf.returnURL
            };

            var login = new Login(loginConf);

            var registerConf = {
                url: conf.registerUrl || DEF_REGISTER_URL,
                serviceId: conf.serviceId || DEF_SERVICE_ID,
                returnURL: conf.returnURL
            };

            var register = new Register(registerConf);

            return {
                opened:false,
                scope:null,
                open: function(name) {
                    if (this.opened) { return; }
                    name = name || "login-window";
                    this.opened = true;
                    this.scope = $rootScope.$new();
                    this.scope.$on("szn-login-close-request", this.close.bind(this));
                    var body = angular.element(document.body);
                    body.append($compile("<szn-login-box activeWindow='" + name + "'></szn-login-box>")(this.scope));
                    $rootScope.$broadcast("szn-login-opened");
                },
                close: function() {
                    if (!this.opened) { return; }
                    this.opened = false;
                    this.scope.$destroy();
                    $rootScope.$broadcast("szn-login-closed");
                },
                getLogin: function() {
                    return login;
                },
                getRegister: function() {
                    return register;
                },
                getConf: function() {
                    return conf;
                }
            };
        }];
    });

    mdl.directive("sznLoginBox", function() {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            link: function($scope, element, attrs) {
                var container = angular.element(element[0]);
                $scope.activeWindow = attrs.activewindow;

                var destroy = function() {
                    container.remove();
                };

                $scope.setActiveWindow = function(name) {
                    $scope.activeWindow = name;
                };

                $scope.$on("$destroy", destroy);
            },
            templateUrl:"./src/html/szn-login-box.html"
        };
    });

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
                            if (sznLoginConf.autoClose) { $scope.close(); }
                            $rootScope.$broadcast("szn-login-done", {auto:false});
                        break;

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

                    $scope.$apply();
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

                $timeout(function() {

                }, 100);
            }],
            link:function($scope, element, attrs) {
                var sznLoginConf = sznLogin.getConf();
                var container = element[0];
                var form = container.querySelector("#sznloginForm");
                var adElm = container.querySelector("#sznLoginAd");

                var showAd = function(data) {
                    var elm = angular.element(adElm).html(data);
                    if (data.indexOf("/impress?spotId") > -1) {
                        elm.addClass("adFull");
                    } else {
                        elm.removeClass("adFull");
                    }
                    $timeout($scope.modifyPosition, 0);
                };

                var onInit = function() {
                    if (window.im && sznLoginConf.zoneId) {
                        var ad = {
                            zoneId: sznLoginConf.zoneId,
                            section: "/login",
                            callback: showAd
                        };
                        im.getAds([ad], true);
                    }
                };

                onInit();
            },
            templateUrl:"./src/html/szn-login-form-window.html"
        };
    }]);

    mdl.directive("sznRegisterFormWindow", ["$timeout", function($timeout) {
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
                    404: "Tento e-mail je u nás již registrován",
                    406: "K registraci chybí heslo",
                    420: "Vaše heslo je příliš slabé",
                    421: "Vaše heslo je příliš slabé",
                    422: "Vaše heslo je příliš krátké. Zadejte delší",
                    423: "Vaše heslo je příliš dlouhé. Zadejte kratší",
                    424: "Heslo obsahuje nepovolené znaky",
                    425: "Na začátku či na konci hesla nesmí být mezera",
                    426: "Hesla se neshodují",
                    427: "Tato schránka ještě neexistuje. Kliknutím na 'Pokračovat' ji zaregistrujete.",
                    430: "Příliš krátký e-mail",
                    431: "Zadaný e-mail je neplatný",
                    500: "Interní chyba systému"
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

                $scope.activateUsernameWatcher = function() {
                    if (usernameWatcherActivated) { return; }
                    $scope.$watch("data.username", $scope.checkUsername);
                    usernameWatcherActivated = true;
                };

                $scope.checkUsername = function(newValue, oldValue) {
                    if (timeoutUsernameFinished) { $timeout.cancel(timeoutUsernameFinished); }

                    timeoutUsernameFinished = $timeout(function() {
                        if (newValue) {
                            sznRegister.checkUser(newValue).then(function(response) {
                                $scope.processStatus(response, "username");
                                $scope.$apply();
                            });
                        } else {
                            $scope.resetError([500, 404, 427, 430, 431]);
                            $scope.valid.username = null;
                            $scope.$apply();
                        }
                    }, 300);
                };

                $scope.activatePasswordWatcher = function() {
                    if (passwordWatcherActivated) { return; }
                    $scope.$watch("data.password", $scope.checkPassword);
                    passwordWatcherActivated = true;
                };

                $scope.checkPassword = function(newValue, oldValue) {
                    if ($scope.data.passwordRepeat) {
                        $scope.checkPasswordRepeat($scope.data.passwordRepeat);
                    }

                    if (timeoutPasswordFinished) { $timeout.cancel(timeoutPasswordFinished); }

                    timeoutPasswordFinished = $timeout(function() {
                        if (newValue) {
                            sznRegister.checkPassword(newValue).then(function(response) {
                                $scope.processStatus(response, "password");
                                $scope.$apply();
                            });
                        } else {
                            $scope.resetError([500, 406, 420, 421, 422, 423, 424]);
                            $scope.valid.password = null;
                            $scope.valid.passwordPower = 0;
                            $scope.changePasswordMeter();
                            $scope.$apply();
                        }
                    }, 300);
                };

                $scope.activatePasswordRepeatWatcher = function() {
                    if (passwordRepeatWatcherActivated) { return; }
                    $scope.$watch("data.passwordRepeat", $scope.checkPasswordRepeat);
                    passwordRepeatWatcherActivated = true;
                };

                $scope.checkPasswordRepeat = function(newValue, oldValue) {
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
                            $scope.$apply();
                        }
                    );
                };
            }],
            link: function($scope, element, attrs) {
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
                    passwordMeter.style.width = power + '%';
                };
            },
            templateUrl:"./src/html/szn-register-form-window.html"
        };
    }]);

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
            }],
            templateUrl:"./src/html/szn-verify-form-window.html"
        };
    }]);

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
                    sznLogin.open();
                });
            }
        };
    }]);

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

    mdl.directive("closeable", [function() {
        return {
            restrict: "A",
            link: function($scope, element, attrs) {
                var container = element[0];
                var closeButton = container.querySelector(".szn-login-close");

                var destroy = function() {
                    angular.element(closeButton).unbind("click", close);
                };

                $scope.close = function(e) {
                    $scope.$emit("szn-login-close-request");
                };

                angular.element(closeButton).bind("click", $scope.close);
                $scope.$on("$destroy", destroy);
            }
        };
    }]);

    mdl.directive("centerPosition", ["$timeout", "$window", function($timeout, $window) {
        return {
            rectrict:"A",
            link: function($scope, element, attrs) {
                var container = element[0];

                var destroy = function() {
                    angular.element($window).unbind("resize", $scope.modifyPosition);
                };

                var onInit = function() {
                    angular.element(container).removeClass("hidden");
                    $scope.modifyPosition();
                };

                $scope.modifyPosition = function(e) {
                    var viewPortWidth = $window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    var viewPortHeight = $window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                    var w = container.offsetWidth;
                    var h = container.offsetHeight;
                    var l = Math.round(viewPortWidth/2-w/2);
                    var t = Math.round(viewPortHeight/2.5-h/2);
                    container.style.left = Math.max(0, l) + "px";
                    container.style.top = Math.max(24, t) + "px";
                };

                angular.element($window).bind("resize", $scope.modifyPosition);
                $scope.$on("$destroy", destroy);

                onInit();
            }
        };
    }]);
})(window, window.angular);