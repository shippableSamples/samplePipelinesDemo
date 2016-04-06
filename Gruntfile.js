module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: [
          'static/app.js',
          'static/app.css'
        ],
        tasks: ['concat_user_code'],
        options: {
          spawn: true,
        },
      }
    },
    concat: {
      app_lib_only: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/underscore/underscore-min.js'
        ],
        dest: 'static/js/lib.cat.js'
      },
      app_user_code: {
        src: [
          'static/js/lib.cat.js',
          'static/app.js'
        ],
        dest: 'static/js/app.cat.js'
      },
      css_lib_only: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.min.css'
        ],
        dest: 'static/css/lib.cat.css'
      },
      css_user_code: {
        src: [
          'static/css/lib.cat.css',
          'static/app.css'
        ],
        dest: 'static/css/app.cat.css'
      }
    },
    uglify: {
      app: {
        files: {
          'static/js/app.min.js': ['static/js/app.cat.js']
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'static/css/app.min.css': ['static/css/app.cat.css']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('concat_user_code',
    ['concat:app_user_code', 'concat:css_user_code']);
  grunt.registerTask('build',
    ['concat', 'uglify', 'cssmin']);
};
