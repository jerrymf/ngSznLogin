(function(win, angular) {

"use strict";

if (!win || !angular) {
    throw new Error("ngSznLogin: I did not found angular. Init failed.");
}

var mdl = angular.module("ngSznLogin", ["ng", "ngAnimate", "pascalprecht.translate"]);

mdl.config([

    "$translateProvider",
    function ($translateProvider) {
        $translateProvider.translations("cs", {
            SZN_LOGIN: {
                LOGIN: {
                    TEXT: "{{text}}",
                    LOST_PASSWORD: "Zaslat zapomenuté heslo",
                    REMEMBER_ME: "Pamatovat si mě na tomto počítači",
                    NOT_REGISTERED: "Nejste zaregistrováni na Seznam.cz",
                    REGISTER_NOW: "Registrujte se",
                    USERNAME_PLACEHOLDER: "Libovolný e-mail",
                    PASSWORD_PLACEHOLDER: "Heslo",
                    LOG_IN: "Přihlásit se",
                    LOG_IN_PROCESS: "Přihlašuji…",
                    COOKIES_NOTIFY: "Pro správné přihlášení je potřeba zapnout cookies. Nevíte se rady? Podívejte se do",
                    HELP: "nápovědy",
                    WEAKPASSWORD_CONTINUE: "Pokračovat se současným heslem",
                    CHANGE_PASSWORD: "Změnit heslo",
                    ERROR: {
                        BAD_LOGIN: "Neexistující uživatel nebo chybné heslo",
                        FORBIDDEN: "Váš účet je zablokován",
                        WEAK_PASSWORD: "Vaše heslo je příliš jednoduché",
                        INTERNAL: "Interní chyba systému",
                        CONNECTION: "Nemůžeme se spojit s našimi servery. Zkuste to, prosím, později"
                    }
                },
                LICENSE: {
                    TITLE: "Změna Smluvních podmínek služeb poskytovaných společností Seznam.cz",
                    TEXT1: "Aby pro vás byly Smluvní podmínky srozumitelnější, rozhodli jsme se je k 1. 2. 2015 zpřehlednit. Přestože se pro vás nic nemění, prosíme o jejich opětovné odsouhlasení nejpozději do 31. 1. 2015.",
                    TEXT2: "Pro připomenutí tady jsou nejdůležitější body:",
                    TEXT3: "S vaším e-mailovým účtem se můžete přihlásit i do našich ostatních služeb (Firmy.cz, Sklik.cz, Seznam peněženka, Mapy.cz, Lidé.cz aj.)",
                    TEXT4: "Některé naše služby před prvním přihlášením vyžadují souhlas se zpracováním osobních údajů",
                    TEXT5: "Pokud se nepřihlásíte ke svému účtu u žádné z našich služeb déle než půl roku, můžeme účet uvolnit pro případnou registraci někoho jiného",
                    TEXT6: "V plném znění si podmínky můžete přelouskat v naší",
                    TEXT7: "Nápovědě",
                    AGREEMENT: "Souhlasím s novými podmínkami",
                    CONTINUE: "Pokračovat",
                    ERROR: {
                        UNKNOWN: "Neznámá chyba"
                    }
                },
                REGISTER: {
                    REGISTER_START: "Registrujte",
                    REGISTER_END: "se a získáte obsah všech služeb Seznam.cz přímo na míru vašim potřebám",
                    USERNAME_PLACEHOLDER: "Libovolný e-mail",
                    PASSWORD_PLACEHOLDER: "Heslo",
                    PASSWORD_REPEAT_PLACEHOLDER: "Zopakujte heslo",
                    CONTINUE: "Pokračovat",
                    AGREEMENT: "Registrací souhlasíte s",
                    TERMS: "podmínkami služby",
                    TERMS_NOTIFY: "Před pokračováním musíte souhlasit s podmínkami služby",
                    ALREADY_REGISTERED: "Jsem registrovaný a chci se přihlásit",
                    CREATE_EMAIL: "Nemám e-mail a chci ho vytvořit",
                    ERROR: {
                        0: "Nemůžeme se spojit s našimi servery. Zkuste to, prosím, později",
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
                    }
                },
                VERIFY: {
                    FINISH_REGISTRATION: "Pro dokončení klikněte na odkaz, který jsme vám poslali na e-mail nebo opište zaslaný kód",
                    CODE_PLACEHOLDER: "Zadejte obdržený kód",
                    FINISH: "Dokončit",
                    NOT_OBTAINED: "Nepřišel vám kód",
                    SEND_CODE_AGAIN: "Zaslat znovu ověřovací kód",
                    CHECK_YOUR_EMAIL: "Zkontrolujte svou e-mailovou schránku, kam jsme vám zaslali nový ověřovací kód",
                    ERROR: {
                        403: "Zadaný kód je neplatný",
                        500: "Interní chyba systému"
                    }
                },
                DONE: {
                    CONGRATULATION: "Blahopřejeme",
                    SUCCESS: "registrace proběhla úspěšně",
                    GO: "Vstoupit na"
                }
            }
        });

        $translateProvider.translations("en", {
            SZN_LOGIN: {
                LOGIN: {
                    TEXT: "{{text}}",
                    LOST_PASSWORD: "Send lost password",
                    REMEMBER_ME: "Remember my details on this computer",
                    NOT_REGISTERED: "Not register on Seznam.cz yet?",
                    REGISTER_NOW: "Register now",
                    USERNAME_PLACEHOLDER: "Your e-mail",
                    PASSWORD_PLACEHOLDER: "Password",
                    LOG_IN: "Sign in",
                    LOG_IN_PROCESS: "Signing…",
                    COOKIES_NOTIFY: "You need to have allowed cookies for successful login. Are you in trouble? Look at",
                    HELP: "our help",
                    WEAKPASSWORD_CONTINUE: "Continue with current password",
                    CHANGE_PASSWORD: "Change password",
                    ERROR: {
                        BAD_LOGIN: "Not existing username or wrong password",
                        FORBIDDEN: "Your account was banned",
                        WEAK_PASSWORD: "Your password is too weak",
                        INTERNAL: "Internal system error",
                        CONNECTION: "We can not connect to our servers. Try it please later"
                    }
                },
                LICENSE: {
                    TITLE: "Terms and Conditions of using Seznam.cz services was changed",
                    TEXT1: "For clearer terms and conditions we decided make it clearly. New ones are valid since 01.02.2015. Altough there is no change for you we please you for your agreement again no later than 31.01.215.",
                    TEXT2: "Here are the most important points:",
                    TEXT3: "With your e-mail account you can even sign into our other services (Firmy.cz, Sklik.cz, Seznam peněženka, Mapy.cz, Lidé.cz, ...)",
                    TEXT4: "Some services needs during their first sign to them agreement with processing of your personal data",
                    TEXT5: "If you do not sign with your account to any our service during half year, we delete your account and we can provide your nick to another one",
                    TEXT6: "Full version of text you can read on our",
                    TEXT7: "help",
                    AGREEMENT: "I agree with new terms and conditions",
                    CONTINUE: "Continue",
                    ERROR: {
                        UNKNOWN: "Uknown error"
                    }
                },
                REGISTER: {
                    REGISTER_START: "Register now",
                    REGISTER_END: "and you can get access to all Seznam.cz services",
                    USERNAME_PLACEHOLDER: "Your e-mail",
                    PASSWORD_PLACEHOLDER: "Password",
                    PASSWORD_REPEAT_PLACEHOLDER: "Repeat password",
                    CONTINUE: "Continue",
                    AGREEMENT: "With registering you agree with",
                    TERMS: "service terms",
                    TERMS_NOTIFY: "Before continue you have to accept our terms",
                    ALREADY_REGISTERED: "I am already registered and want to sign in",
                    CREATE_EMAIL: "I do not have e-mail on Seznam.cz and I want to create it.",
                    ERROR: {
                        0: "We can not connect to our servers. Try it please later",
                        404: "This e-mail is already registered",
                        406: "We are missing password",
                        420: "Your password is too weak",
                        421: "Your password is too weak",
                        422: "Your password is too short. Type longer password.",
                        423: "Your password is too long. Type shorter password",
                        424: "Your password contains unallowed characters.",
                        425: "Your password can not contain white space at start or at end",
                        426: "Your passwords do not match",
                        427: "This e-mail is not registered yet. Click on 'Continue' for registration finish",
                        430: "Too short e-mail",
                        431: "E-mail is not valid",
                        500: "Internal system error"
                    }
                },
                VERIFY: {
                    FINISH_REGISTRATION: "For finish click on link we sent you to your e-mail or re-type sent code",
                    CODE_PLACEHOLDER: "Zadejte obdržený kód",
                    FINISH: "Dokončit",
                    NOT_OBTAINED: "Code not obtained",
                    SEND_CODE_AGAIN: "Send verification code again",
                    CHECK_YOUR_EMAIL: "Check your e-mail, we have sent you another verification code",
                    ERROR: {
                        0: "We can not connect to our servers. Try it please later",
                        403: "Code is not valid",
                        500: "Internal system error"
                    }
                },
                DONE: {
                    CONGRATULATION: "Congratulations",
                    SUCCESS: "registrion was successful",
                    GO: "Go to"
                }
            }
        });

        $translateProvider.preferredLanguage("cs");
    }

]);

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

if (!("getSelection" in win)) {
    // we are in IE8
    document.createElement("szn-login-box");
    document.createElement("szn-login-form-window");
    document.createElement("szn-register-form-window");
    document.createElement("szn-verify-form-window");
    document.createElement("szn-done-form-window");
}

mdl.constant("DEFAULTS", {
    loginUrl: "https://login.szn.cz",
    registerUrl: "https://registrace.seznam.cz",
    serviceId: "email"
});

mdl.factory("SznBackendTransport", ["$http", "$q", "$timeout", function($http, $q, $timeout) {
    var TIMEOUT = 6000;

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
        this._timeout = null;
        this._isTimeout = false;
        this._onMessage = this._onMessage.bind(this);
        this._onTimeout = this._onTimeout.bind(this);

        angular.element(window).bind("message", this._onMessage);
    };

    LoginIframe.isSupported = !!window.postMessage;

    LoginIframe.prototype.get = function(method, params) {
        this._isTimeout = false;
        this._deferred = $q.defer();

        var url = this._url + method;
        var arr = [];

        for (var name in params) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(params[name]));
        }

        this._iframe.src = url + "?" + arr.join("&");

        document.body.insertBefore(
            this._iframe,
            document.body.firstChild
        );

        this._timeout = $timeout(this._onTimeout, TIMEOUT);

        return this._deferred.promise;

    };

    LoginIframe.prototype.post = function(method, params) {
        this._isTimeout = false;
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
        document.body.insertBefore(
            this._iframe,
            document.body.firstChild
        );
        form.submit();
        form.parentNode.removeChild(form);

        this._timeout = $timeout(this._onTimeout, TIMEOUT);

        return this._deferred.promise;
    };

    LoginIframe.prototype._buildIframe = function() {
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = '<iframe name="' + this._id + '"></iframe>';
        var iframe = tempDiv.firstChild;
        iframe.style.display = "none";
        return iframe;
    };

    LoginIframe.prototype._onMessage = function(e) {
        if (!this._isAllowedUrl(e.origin)) { return; }
        if (this._isTimeout) { return; }

        this._clearTimeout();

        if (!this._deferred) { return; }

        this._removeIframe();

        var deferred = this._deferred;
        this._deferred = null;
        deferred.resolve({data:JSON.parse(e.data)});
    };

    LoginIframe.prototype._onTimeout = function() {
        if (!this._timeout) { return; }
        this._isTimeout = true;
        this._clearTimeout();
        this._removeIframe();

        var deferred = this._deferred;
        this._deferred = null;
        deferred.reject();
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

    LoginIframe.prototype._removeIframe = function() {
        this._iframe.parentNode.removeChild(this._iframe);
    };

    LoginIframe.prototype._clearTimeout = function() {
        if (!this._timeout) { return; }
        this._timeout = null;
    };

    if (LoginRequest.isSupported) {
        return LoginRequest;
    } else if (LoginIframe.isSupported) {
        return LoginIframe;
    } else {
        throw new Error("ngSznLogin: There is no supported login method.");
    }
}]);

mdl.factory("SznLoginBackend", ["$q", "SznBackendTransport", function($q, SznBackendTransport) {
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
            openId: "/loginOIProcess",
            license: "/beta/confirmLicence"
        };

        for (var i in conf) {
            var value = conf[i];
            if (value) {
                this._conf[i] = value;
            }
        }

        this._transport = new SznBackendTransport(this._conf.url);
        this._cookie = true;
        this._checked = false;

        this._cdata   = null;
    };

    Login.prototype.check = function() {
        var check = $q.defer();
        var data = this._getCommonData();

        this._transport.get(this._methods.status, data).then(
            function(response) {
                var data = response.data;
                this._cookie = data.cookie;
                this._checked = true;
                check.resolve(data.logged);
            }.bind(this),
            function() {
                check.reject();
            }
        );

        return check.promise;
    };

    Login.prototype.autologin = function() {
        if (!this._checked) {
            return this.check().then(this.autologin.bind(this));
        }

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
        if (!this._checked) {
            return this.check().then(this.login.bind(this, name, pass, remember));
        }

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

        this._transport.post(this._methods.login, data).then(
            function(response) {
                var data = response.data;
                if (data.cdata) { this._cdata = cdata; }
                defered.resolve({data:data});
            }.bind(this),
            function() {
                this._cdata = null;
                defered.reject();
            }.bind(this)
        );

        return defered.promise;
    };

    Login.prototype.confirmLicence = function(agree) {
        var data = this._getCommonData();
        data.cdata = this._cdata;

        if (agree) { data.setlicence = 1; }

        return this._transport.post(this._methods.license, data);
    };

    Login.prototype._getCommonData = function() {
        return {
            serviceId: this._conf.serviceId,
            returnURL: this._conf.returnURL || win.location.href
        };
    };

    return Login;
}]);

mdl.factory("SznRegisterBackend", ["SznBackendTransport", function(SznBackendTransport) {
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

        this._transport = new SznBackendTransport(this._conf.url);
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

    return Register;
}]);

mdl.provider("sznLogin", function() {
    var conf = {
        url:"",
        serviceId:"",
        returnURL: "",
        multilingualText: {
            "cs": {
                def: "Přihlaste se tam, kam se dosud nikdo nevydal"
            },
            "en": {
                def: "Sign in places where no man has gone before"
            }
        },
        multilingualTextId: "def",
        language: "cs",
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

    this.$get = [

        "$compile", "$rootScope", "$timeout", "$translate", "SznLoginBackend", "SznRegisterBackend", "DEFAULTS",
        function($compile, $rootScope, $timeout, $translate, SznLoginBackend, SznRegisterBackend, DEFAULTS) {

            var loginConf = {
                url: conf.url || DEFAULTS.loginUrl,
                serviceId: conf.serviceId || DEFAULTS.serviceId,
                returnURL: conf.returnURL
            };

            var login = new SznLoginBackend(loginConf);

            var registerConf = {
                url: conf.registerUrl || DEFAULTS.registerUrl,
                serviceId: conf.serviceId || DEFAULTS.serviceId,
                returnURL: conf.returnURL
            };

            var register = new SznRegisterBackend(registerConf);

            $translate.use(conf.language);

            return {
                opened:false,
                scope:null,
                open: function(name, afterLoginAction) {
                    if (this.opened) { return; }
                    this.opened = true;

                    name = name || "login-window";

                    var cbk = afterLoginAction;

                    this.scope = $rootScope.$new();
                    this.scope.$on("szn-login-close-request", this.close.bind(this));
                    this.scope.$on("szn-login-done", function() {
                        if (cbk) { $timeout(cbk); }
                        if (this.getConf().autoClose) { $timeout(function() { this.close(); }.bind(this)); }
                    }.bind(this));

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
                changeLanguage: function(language) {
                    conf.language = language;
                    $translate.use(language);
                },
                useText: function(textId) {
                    conf.multilingualTextId = textId;
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

        }

    ];
});

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


mdl.directive("sznLoginBox", ["$animate", "$timeout", function($animate, $timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: {},
        link: function($scope, element, attrs) {
            var elm = element[0];
            var overlay = elm.querySelector(".szn-login-overlay");

            $scope.oldActiveWindow = null;
            $scope.activeWindow = attrs.activewindow;

            var remove = function() {
                angular.element(elm).remove();
            };

            var onDestroy = function() {
                $scope.oldActiveWindow = null;
                $scope.activeWindow = null;
                $animate.removeClass(overlay, "szn-login-active", remove);

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };

            $scope.setActiveWindow = function(name) {
                $scope.oldActiveWindow = $scope.activeWindow;
                $scope.activeWindow = name;
                $scope.$broadcast("szn-login-active-window-changed", {old:$scope.oldActiveWindow, current:$scope.activeWindow});
            };

            $scope.$on("$destroy", onDestroy);

            $timeout(function() {
                $animate.addClass(overlay, "szn-login-active");
            });
        },
        templateUrl:"./src/html/szn-login-box.html"
    };
}]);

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

                    case 430: /* souhlas s podminkami */
                        $scope.setActiveWindow("login-license-window");
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

            $scope.changeClasses = function(old, newOne) {
                if (newOne == "register-window") {
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
        templateUrl:"./src/html/szn-login-license-form-window.html"
    };
}]);

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
                            $scope.setActiveWindow("register-verify-window");
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

            $scope.changeClasses = function(old, newOne) {
                if (newOne == "login-window") {
                    $animate.addClass(container, "to-right");
                }

                if (newOne == "register-verify-window") {
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

mdl.directive("sznRegisterVerifyFormWindow", ["$timeout", "$animate", function($timeout, $animate) {
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
                            $scope.setActiveWindow("register-done-window");
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
        templateUrl:"./src/html/szn-register-verify-form-window.html"
    };
}]);

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

mdl.directive("autoFillSync", ["$timeout", function($timeout) {
        return {
            require: "ngModel",
            link: function($scope, elm, attrs, ngModel) {
                var origVal = elm.val();

                $timeout(function() {
                    var newVal = elm.val();

                    if(ngModel.$pristine && origVal !== newVal) {
                        ngModel.$setViewValue(newVal);
                    }

                    elm.attr("placeholder", elm.attr("szn-placeholder"));
                    elm.val(newVal);
                }, 200);
            }
        };
}]);

mdl.directive("centerPosition", ["$timeout", "$window", function($timeout, $window) {
    return {
        rectrict:"A",
        link: function($scope, elements, attrs) {
            var container = elements[0];

            var destroy = function() {
                angular.element($window).unbind("resize", $scope.modifyPosition);
            };

            var onInit = function() {
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

            $timeout(onInit);
        }
    };
}]);

mdl.directive("closeable", [function() {
    return {
        restrict: "A",
        link: function($scope, element, attrs) {
            var container = element[0];
            var closeButton = container.querySelector(".szn-login-close");

            var onKeyup = function(e) {
                var keycode = e.keycode || e.which;
                if (keycode == 27) {
                    $scope.close();
                }
            };

            var destroy = function() {
                angular.element(closeButton).unbind("click", close);
                angular.element(window).unbind("keyup", onKeyup);
            };

            $scope.close = function(e) {
                $scope.$emit("szn-login-close-request");
            };

            angular.element(closeButton).bind("click", $scope.close);
            angular.element(window).bind("keyup", onKeyup);
            $scope.$on("$destroy", destroy);
        }
    };
}]);

mdl.directive("focusable", ["$timeout", function($timeout) {
    return {
        restrict:"A",
        link: function($scope, elements, attrs) {
            var elm = elements[0];
            $timeout(function() {
                elm.focus();
            }, 700);
        }
    };
}]);

})(window, window.angular);

angular.module('ngSznLogin').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./src/html/szn-login-box.html',
    "<div id=\"sznLoginBox\"><div class=\"szn-login-overlay\"></div><div class=\"szn-login-overflow\"><szn-login-form-window ng-if=\"activeWindow == 'login-window'\" center-position closeable></szn-login-form-window><szn-login-license-form-window ng-if=\"activeWindow == 'login-license-window'\" center-position closeable></szn-login-license-form-window><szn-register-form-window ng-if=\"activeWindow == 'register-window'\" center-position closeable></szn-register-form-window><szn-register-verify-form-window ng-if=\"activeWindow == 'register-verify-window'\" center-position closeable></szn-register-verify-form-window><szn-register-done-form-window ng-if=\"activeWindow == 'register-done-window'\" center-position closeable></szn-register-done-form-window></div></div>"
  );


  $templateCache.put('./src/html/szn-login-form-window.html',
    "<div class=\"szn-login-window\"><div class=\"szn-login-close\"></div><div class=\"szn-login-page\"><div id=\"sznLoginAd\"></div><form id=\"sznLoginForm\" class=\"szn-login-form\" method=\"post\" ng-submit=\"submit($event);\"><div class=\"text\" ng-if=\"!error.msg\">{{ 'SZN_LOGIN.LOGIN.TEXT' | translate: '{ text: text }' }}</div><div class=\"text error\" ng-if=\"!!error.msg\"><strong>{{ error.msg | translate }}!</strong> <span ng-if=\"error.href\">(<a ng-href=\"{{error.href}}\" target=\"_blank\">?</a>)</span></div><div ng-if=\"error.weakpassword.positive\"><div><a ng-href=\"{{error.weakpassword.href}}\">{{ 'SZN_LOGIN.LOGIN.CHANGE_PASSWORD' | translate }}</a></div><div><a ng-href=\"#\" ng-click=\"continueWithWeakPassword($event);\">{{ 'SZN_LOGIN.LOGIN.WEAKPASSWORD_CONTINUE' | translate }}</a></div></div><div ng-if=\"!error.weakpassword.positive && !error.cookieDisabled\"><div><span class=\"input\" ng-class=\"{error: error.msg != ''}\"><input type=\"text\" name=\"username\" ng-model=\"data.username\" auto-fill-sync szn-placeholder=\"{{ 'SZN_LOGIN.LOGIN.USERNAME_PLACEHOLDER' | translate }}\" focusable><span class=\"icon\"></span></span></div><div><span class=\"input\" ng-class=\"{error: error.msg != ''}\"><input type=\"password\" name=\"password\" ng-model=\"data.password\" auto-fill-sync szn-placeholder=\"{{ 'SZN_LOGIN.LOGIN.PASSWORD_PLACEHOLDER' | translate }}\"><span class=\"icon\"></span></span><span class=\"submit-btn\"><span class=\"loading\" ng-show=\"loading\"></span><input type=\"submit\" value=\"{{ (loading ? 'SZN_LOGIN.LOGIN.LOG_IN_PROCESS' : 'SZN_LOGIN.LOGIN.LOG_IN') | translate }}\"></span></div><div><label><input type=\"checkbox\" ng-checked=\"data.remember\" ng-model=\"data.remember\">{{ 'SZN_LOGIN.LOGIN.REMEMBER_ME' | translate }} (<a target=\"_blank\" ng-href=\"http://napoveda.seznam.cz/cz/login/prihlaseni/\">?</a>)</label></div></div><div ng-if=\"error.cookieDisabled\"><div>{{ 'SZN_LOGIN.LOGIN.COOKIES_NOTIFY' | translate }} <a target=\"_blank\" ng-href=\"http://napoveda.seznam.cz/cz/povoleni-cookie-v-internetovych-prohlizecich.html\">{{ 'SZN_LOGIN.LOGIN.HELP' | translate }}</a>.</div></div><div><div class=\"info\">{{ 'SZN_LOGIN.LOGIN.NOT_REGISTERED' | translate }}? <a ng-href=\"#\" ng-click=\"activateRegisterPage($event)\">{{ 'SZN_LOGIN.LOGIN.REGISTER_NOW' | translate }}!</a></div><div><a ng-href=\"http://napoveda.seznam.cz/cz/zapomenute-heslo.html\">{{ 'SZN_LOGIN.LOGIN.LOST_PASSWORD' | translate }}</a></div></div><div class=\"line\"></div></form></div></div>"
  );


  $templateCache.put('./src/html/szn-login-license-form-window.html',
    "<div class=\"szn-login-window license\"><div class=\"szn-login-close\"></div><div class=\"szn-login-license-page\"><form id=\"sznLoginForm\" class=\"szn-login-form\" method=\"post\" ng-submit=\"submit($event);\"><div class=\"text error\" ng-if=\"!!error.msg\"><strong>{{ error.msg | translate }}!</strong> <span ng-if=\"error.href\">(<a ng-href=\"{{error.href}}\" target=\"_blank\">?</a>)</span></div><div><div><strong>{{ 'SZN_LOGIN.LICENSE.TITLE' | translate }}</strong></div><div>{{ 'SZN_LOGIN.LICENSE.TEXT1' | translate }}</div><div>{{ 'SZN_LOGIN.LICENSE.TEXT2' | translate }}</div><ul><li>{{ 'SZN_LOGIN.LICENSE.TEXT3' | translate }}</li><li>{{ 'SZN_LOGIN.LICENSE.TEXT4' | translate }}</li><li>{{ 'SZN_LOGIN.LICENSE.TEXT5' | translate }}</li></ul><div>{{ 'SZN_LOGIN.LICENSE.TEXT6' | translate }} <a target=\"_blank\" href=\"http://napoveda.seznam.cz/cz/smluvni-podminky-pro-registraci-uzivatelu-1-1-2015.html\">{{ 'SZN_LOGIN.LICENSE.TEXT7' | translate }}</a>.</div><div class=\"agreement-line\"><label><input type=\"checkbox\" class=\"agree\" ng-model=\"data.agree\">{{ 'SZN_LOGIN.LICENSE.AGREEMENT' | translate }}</label></div><div class=\"submit-line\"><input type=\"submit\" value=\"{{ 'SZN_LOGIN.LICENSE.CONTINUE' | translate }}\"></div><div class=\"line\"></div></div></form></div></div>"
  );


  $templateCache.put('./src/html/szn-register-done-form-window.html',
    "<div class=\"szn-login-window done\"><div class=\"szn-login-close\"></div><div class=\"szn-done-page\"><form id=\"sznLoginForm\" class=\"szn-login-form\"><div class=\"text\"><strong>{{ 'SZN_LOGIN.DONE.CONGRATULATION' | translate }},</strong> {{ 'SZN_LOGIN.DONE.SUCCESS' | translate }} :-)</div><div><div class=\"done\"><input type=\"button\" value=\"{{ 'SZN_LOGIN.DONE.GO' | translate }} {{host}}\" ng-click=\"close();\"></div></div></form></div></div>"
  );


  $templateCache.put('./src/html/szn-register-form-window.html',
    "<div class=\"szn-login-window register\"><div class=\"szn-login-close\"></div><div class=\"szn-register-page\"><form id=\"sznLoginForm\" class=\"szn-login-form\" method=\"post\" ng-submit=\"submit($event);\"><div class=\"text\"><strong>{{ 'SZN_LOGIN.REGISTER.REGISTER_START' | translate }}</strong> {{ 'SZN_LOGIN.REGISTER.REGISTER_END' | translate }}.</div><div><div><span class=\"input\" ng-class=\"{ok: valid.username, error: valid.username === false}\"><input type=\"text\" name=\"username\" placeholder=\"{{ 'SZN_LOGIN.REGISTER.USERNAME_PLACEHOLDER' | translate }}\" ng-model=\"data.username\" ng-blur=\"activateUsernameWatcher();\" focusable><span class=\"icon\"></span></span></div><div class=\"password-line\"><span class=\"input\" ng-class=\"{ok: valid.password, error: valid.password === false}\"><input type=\"password\" placeholder=\"{{ 'SZN_LOGIN.REGISTER.PASSWORD_PLACEHOLDER' | translate }}\" ng-model=\"data.password\" ng-blur=\"activatePasswordWatcher();\"><span class=\"icon\"></span><span id=\"passwordMeter\"><span style=\"width: 0%; background-color: rgb(238, 14, 14)\"></span></span></span> <span class=\"input second\" ng-class=\"{ok: valid.passwordRepeat, error: valid.passwordRepeat === false}\"><input type=\"password\" placeholder=\"{{ 'SZN_LOGIN.REGISTER.PASSWORD_REPEAT_PLACEHOLDER' | translate }}\" ng-model=\"data.passwordRepeat\" ng-blur=\"activatePasswordRepeatWatcher();\"><span class=\"icon\"></span></span><div class=\"szn-login-clear\"></div></div><div class=\"text error\" ng-if=\"!!error.msgs.length\"><div ng-repeat=\"emsg in error.msgs\"><strong>{{ emsg.msg | translate }}!</strong></div></div><div><input type=\"checkbox\" ng-model=\"data.acceptation\">{{ 'SZN_LOGIN.REGISTER.AGREEMENT' | translate }} <a ng-href=\"https://registrace.seznam.cz/licenceScreen\" target=\"_blank\">{{ 'SZN_LOGIN.REGISTER.TERMS' | translate }}</a>.</div><input type=\"submit\" value=\"{{ 'SZN_LOGIN.REGISTER.CONTINUE' | translate }}\" ng-class=\"{disabled:!data.acceptation}\" title=\"{{ 'SZN_LOGIN.REGISTER.TERMS_NOTIFY' | translate }}\"><div class=\"info\"><a ng-href=\"https://registrace.seznam.cz\" target=\"_blank\">{{ 'SZN_LOGIN.REGISTER.CREATE_EMAIL' | translate }}</a></div><div><a ng-href=\"#\" ng-click=\"activateLoginPage($event);\">{{ 'SZN_LOGIN.REGISTER.ALREADY_REGISTERED' | translate }}</a></div></div></form></div></div>"
  );


  $templateCache.put('./src/html/szn-register-verify-form-window.html',
    "<div class=\"szn-login-window verify\"><div class=\"szn-login-close\"></div><div class=\"szn-verify-page\"><form id=\"sznLoginForm\" class=\"szn-login-form\" method=\"post\" ng-submit=\"submit($event);\"><div class=\"text\">{{ 'SZN_LOGIN.VERIFY.FINISH_REGISTRATION' | translate }}.</div><div><div><span class=\"input\"><input type=\"text\" name=\"verify\" placeholder=\"XXXXXX\" title=\"{{ 'SZN_LOGIN.VERIFY.CODE_PLACEHOLDER' | translate }}\" ng-model=\"data.pin\" focusable><span class=\"icon\"></span></span><input type=\"submit\" value=\"{{ 'SZN_LOGIN.VERIFY.FINISH' | translate }}\"></div><div class=\"text error\" ng-if=\"!!error.msgs.length\"><div ng-repeat=\"emsg in error.msgs\"><strong>{{emsg.msg}}</strong></div></div><div class=\"resend\" ng-if=\"!resended\">{{ 'SZN_LOGIN.VERIFY.NOT_OBTAINED' | translate }}? <a ng-href=\"#\" ng-click=\"resendCode($event);\">{{ 'SZN_LOGIN.VERIFY.SEND_CODE_AGAIN' | translate }}.</a></div><div class=\"text resend notify\" ng-if=\"!!resended\"><strong>{{ 'SZN_LOGIN.VERIFY.CHECK_YOUR_EMAIL' | translate }}.</strong></div></div></form></div></div>"
  );

}]);
