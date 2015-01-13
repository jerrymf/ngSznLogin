ngSznLogin (v0.9.18.2)
==========

Module for signing into Seznam.cz web services.

Basic usage:
===========

It is recommended to use bower:

<pre>
  bower install ng-szn-login --save
</pre>

1) First of all, you have to solve dependecies. This module is depended on angular-translate and angular-animate. So you have to include scripts:

<pre>
  &lt;script type="text/javascript" src="path_to_bower_components/angular/angular.min.js"&gt;&lt;/script&gt;
  &lt;script type="text/javascript" src="path_to_bower_components/angular-translate/angular-translate.min.js"&gt;&lt;/script&gt;
  &lt;script type="text/javascript" src="path_to_bower_components/angular-animate/angular-animate.min.js"&gt;&lt;/script&gt;
  &lt;script type="text/javascript" src="path_to_bower_components/ng-szn-login/dist/ng-szn-login.js"&gt;&lt;/script&gt;
</pre>

2) It uses less preprocessor for working with CSS:

In your project you have to import ng-szn-login.less, that contains all CSS rules for module. It is dependend on lesshat (http://lesshat.madebysource.com) and variables set in ng-szn-login-config.less. This configuration you have to create in your app. So in your style.less file can be something like this:

<pre>
  /* import lesshat less framework */
  @import "path_to_bower_components/lesshat/build/lesshat.less";
  
  /* set where are stored images of this module (found in dist directory) */
  @szn-login-img-path: "img";
  
  /* import less file with css rules of szn login module */
  @import "path_to_bower_components/ng-szn-login/dist/ng-szn-login.less";
</pre>

3) In angular configuration you have to set important options:

<pre>
  &lt;script type="text/javascript"&gt;
    
    /* your application is depended on szn-login module */
    var app = angular.module("app", ["ngSznLogin"]);
    
    /* url and register url are important for correct working, but in case you work with .cz, it is set as default */
    app.config(["sznLoginProvider", function(sznLoginProvider) {
        sznLoginProvider.config({
            url:          "https://login.szn.cz", /* if you want to work with dev machines, you must change this url */
            registerUrl:  "https://registrace.seznam.cz", /* if you want to work with dev machines, you must change this url */
            serviceId:    "servicename" /* serviceId is id of service, where it is used, for example: lide, zbozi, sreality */
        });
    }]);
  
  &lt;/script&gt;
</pre>

4) There is directive named szn-login-init. It is easy to use:

<pre>
  &lt;button szn-login-init&gt;Sign in&lt;/button&gt;
</pre>

Then when you click on button, it automatically opens login window.

5) Do not forget to register listener for signal "szn-login-done". It is broadcasted when user is succesfully signed in.

Example:

<pre>
  &lt;body ngController="MainCtrl"&gt;&lt;/body&gt;
  
  &lt;script type="text/javascript"&gt;
    app.controller("MainCtrl", ["$scope", function($scope) {
        $scope.$on("szn-login-done", function(auto) {
            /* parametr auto is boolean value, that indicates if user was signed by autologin or not */
            console.log("Signed in");
        });
    }]);
  &lt;/script&gt;
</pre>

Custom usage:
===========

Preparing ...
