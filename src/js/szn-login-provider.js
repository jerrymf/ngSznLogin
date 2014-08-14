mdl.provider("sznLogin", function() {
    var conf = {
        url:"",
        serviceId:"",
        returnURL: "",
        text: "<strong>Přihlaste se</strong> tam, kam se dosud nikdo nevydal.",
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
                    $translate.use(language);
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