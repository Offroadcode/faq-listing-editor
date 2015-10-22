
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pkgMeta: grunt.file.readJSON('config/meta.json'),
    dest: grunt.option('target') || 'Umbraco',
    basePath: path.join('<%= dest %>', 'App_Plugins', '<%= pkgMeta.name %>'),

    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      js: {
        files: ['FAQ/**/*.js'],
        tasks: ['concat:dist']
      },
      html: {
        files: ['FAQ/**/*.html'],
        tasks: ['copy:html', 'copy:manifest']
      }
    },

    concat: {
      options: {
        stripBanners: false
      },
      dist: {
        src: [
            'FAQ/faq.namespaces.js',
            'FAQ/models/faq.models.js',
            'FAQ/resources/datatype.resource.js',
            'FAQ/controllers/faq.listing.editor.controller.js'
        ],
        dest: '<%= basePath %>/js/faq.js'
      }
    },

    copy: {
      html: {
        cwd: 'FAQ/views/',
        src: [
            'FAQListingEditorView.html'
        ],
        dest: '<%= basePath %>/views/',
        expand: true,
        rename: function(dest, src) {
            return dest + src;
          }
      },
      manifest: {
          cwd: 'FAQ/',
          src: [
              'package.manifest'
          ],
          dest: '<%= basePath %>/',
          expand: true,
          rename: function(dest, src) {
              return dest + src;
          }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: {
        src: ['app/**/*.js', 'lib/**/*.js']
      }
    }

  });

  grunt.registerTask('default', ['concat', 'copy:html', 'copy:manifest']);
};
