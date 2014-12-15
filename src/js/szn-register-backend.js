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