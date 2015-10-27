
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pkgMeta: grunt.file.readJSON('config/meta.json'),
    dest: grunt.option('target') || 'dist',
    basePath: path.join('<%= dest %>', 'App_Plugins', '<%= pkgMeta.name %>'),

    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      dll: {
        files: ['FAQ/Umbraco/FAQPackage/**/*.cs'] ,
        tasks: ['msbuild:dist', 'copy:dll']
      },
      js: {
        files: ['FAQ/**/*.js'],
        tasks: ['concat:dist']
      },
      html: {
        files: ['FAQ/**/*.html'],
        tasks: ['copy:html', 'copy:manifest']
      },
	  manifest: {
		files: ['FAQ/package.manifest'],
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
        converter: {
            cwd: 'FAQ/Umbraco/App_Code/Converters/',
    		src: [
    			'FAQListingPropertyValueConverter.cs'
    		],
    		dest: '<%= dest %>/App_Code/Converters/',
    		expand: true,
    		rename: function(dest, src) {
    			return dest + src;
    		}
        },
        dll: {
            cwd: 'FAQ/Umbraco/FAQPackage/bin/debug/',
            src: 'FAQPackage.dll',
            dest: '<%= dest %>/bin/',
            expand: true
        },
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
        },
        models: {
            cwd: 'FAQ/Umbraco/App_Code/Models/',
            src: [
                'FAQItem.cs',
                'FAQListing.cs'
            ],
            dest: '<%= dest %>/App_Code/Models/',
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
  },

  msbuild: {
      options: {
        stdout: true,
        verbosity: 'quiet',
        maxCpuCount: 4,
        version: 4.0,
        buildParameters: {
          WarningLevel: 2,
          NoWarn: 1607
        }
    },
    dist: {
        src: ['FAQ/Umbraco/FAQPackage/FAQPackage.csproj'],
        options: {
            projectConfiguration: 'Debug',
            targets: ['Clean', 'Rebuild'],
        }
    }
  }

  });

  grunt.registerTask('default', ['concat', 'copy:converter', 'copy:html', 'copy:manifest', 'copy:models', 'msbuild:dist', 'copy:dll']);
};
