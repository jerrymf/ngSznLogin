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
            src:"./src/css/ng-szn-login.less",
            dest:"./build/ng-szn-login.css"
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
            dest: "./build/templates.js"
          }
        },
        concat: {
           dist: {
               options: {
                   separator: "\n\n"
               },
               src: [
                   "./src/js/ng-szn-login.js",
                   "./build/templates.js"
                ],
               dest: "./build/ng-szn-login.js"
            }
        },
        clean: {
            js: ["./build/templates.js"]
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "./src/img/",
                    src: "**",
                    dest: "./build/img"
                },{
                    expand: true,
                    cwd: "./src/css/",
                    src: "**",
                    dest: "./build/"
                }]
            }
        },
        watch: {
            html: {
                files: ["<%= ngtemplates.ngSznLogin.src %>"],
                tasks: ["ngtemplates", "concat", "copy", "clean"]
            },
            styles: {
                files: ["./src/css/**/*.less"],
                tasks: ["less"],
                options: {
                  nospawn: true
                }
            },
            js: {
              files: ["./src/js/**/*.js", "./build/templates.js"],
              tasks: ["ngtemplates", "concat", "copy", "clean"]
            }
        }
    });

    grunt.registerTask("default", []);
    grunt.registerTask("build", ["less", "ngtemplates", "concat", "copy", "clean"]);

};