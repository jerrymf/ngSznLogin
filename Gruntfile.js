module.exports = function ( grunt ) {

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-angular-templates");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less: {
          build: {
            src:"./src/less/ng-szn-login.less",
            dest:"./dist/ng-szn-login.css"
          }
        },
        ngtemplates:  {
          ngSznLogin: {
            options: {
              htmlmin:  {
                collapseWhitespace: true
              }
            },
            src: "./src/html/**/*.html",
            dest: "./dist/templates.js"
          }
        },
        concat: {
           dist: {
               options: {
                   separator: "\n\n"
               },
               src: [
                   "./src/js/ng-szn-login.prefix",
                   "./src/js/ie8-fix.js",
                   "./src/js/defaults.js",
                   "./src/js/szn-login-transport.js",
                   "./src/js/szn-login-backend.js",
                   "./src/js/szn-register-backend.js",
                   "./src/js/szn-login-provider.js",
                   "./src/js/szn-login-init-directive.js",
                   "./src/js/szn-login-box-directive.js",
                   "./src/js/szn-login-form-window-directive.js",
                   "./src/js/szn-register-form-window-directive.js",
                   "./src/js/szn-verify-form-window-directive.js",
                   "./src/js/szn-done-form-window-directive.js",
                   "./src/js/szn-login-init-directive.js",
                   "./src/js/common-auto-fill-sync-directive.js",
                   "./src/js/common-center-position-directive.js",
                   "./src/js/common-closeable-directive.js",
                   "./src/js/ng-szn-login.suffix",
                   "./dist/templates.js"
                ],
               dest: "./dist/ng-szn-login.js"
            }
        },
        clean: {
            js: ["./dist/templates.js"]
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "./src/img/",
                    src: "**",
                    dest: "./dist/img"
                },{
                    expand: true,
                    cwd: "./src/less/",
                    src: "**",
                    dest: "./dist/"
                }]
            }
        },
        watch: {
            html: {
                files: ["<%= ngtemplates.ngSznLogin.src %>"],
                tasks: ["ngtemplates", "concat", "copy", "clean"]
            },
            styles: {
                files: ["./src/less/**/*.less"],
                tasks: ["less"],
                options: {
                  nospawn: true
                }
            },
            js: {
              files: ["./src/js/**/*.js", "./dist/templates.js"],
              tasks: ["ngtemplates", "concat", "copy", "clean"]
            }
        }
    });

    grunt.registerTask("default", ["build"]);
    grunt.registerTask("build", ["less", "ngtemplates", "concat", "copy", "clean"]);

};