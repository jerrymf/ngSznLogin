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