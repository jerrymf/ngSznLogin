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