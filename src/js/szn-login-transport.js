mdl.factory("SznLoginTransport", ["$http", "$q", "$timeout", function($http, $q, $timeout) {
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

        this._timeout = $timeout(this._onTimeout, 2000);

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
        form.submit();
        form.parentNode.removeChild(form);

        this._timeout = $timeout(this._onTimeout, 2000);

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
        if (this._isTimeout) { return; }

        this._clearTimeout();

        var deferred = this._deferred;
        this._deferred = null;
        deferred.resolve({data:JSON.parse(e.data)});
    };

    LoginIframe.prototype._onTimeout = function() {
        if (!this._timeout) { return; }
        this._isTimeout = true;
        this._clearTimeout();

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