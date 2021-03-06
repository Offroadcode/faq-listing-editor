
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
        files: ['FAQ/Umbraco/FAQListing/**/*.cs'] ,
        tasks: ['msbuild:dist', 'copy:dll']
      },
      js: {
        files: ['FAQ/**/*.js'],
        tasks: ['concat:dist']
      },
      html: {
        files: ['FAQ/**/*.html'],
        tasks: ['copy:html']
      },
	  sass: {
		files: ['FAQ/**/*.scss'],
		tasks: ['sass', 'copy:css']
	  },
	  css: {
		files: ['FAQ/**/*.css'],
		tasks: ['copy:css']
	  },
	  manifest: {
		files: ['FAQ/package.manifest'],
		tasks: ['copy:manifest']
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
            'FAQ/controllers/faq.listing.editor.controller.js'
        ],
        dest: '<%= basePath %>/js/faq.js'
      }
    },

    copy: {
        dll: {
            cwd: 'FAQ/Umbraco/FAQListing/bin/debug/',
            src: 'FAQListing.dll',
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
		css: {
			cwd: 'FAQ/css/',
			src: [
				'faq.css'
			],
			dest: '<%= basePath %>/css/',
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
       umbraco: {
        cwd: '<%= dest %>',
        src: '**/*',
        dest: 'tmp/umbraco',
        expand: true
      }
    },

    umbracoPackage: {
      options: {
        name: "<%= pkgMeta.name %>",
        version: '<%= pkgMeta.version %>',
        url: '<%= pkgMeta.url %>',
        license: '<%= pkgMeta.license %>',
        licenseUrl: '<%= pkgMeta.licenseUrl %>',
        author: '<%= pkgMeta.author %>',
        authorUrl: '<%= pkgMeta.authorUrl %>',
        manifest: 'config/package.xml',
        readme: 'config/readme.txt',
        sourceDir: 'tmp/umbraco',
        outputDir: 'pkg',
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
  
  sass: {
		dist: {
			options: {
				style: 'compressed'
			},
			files: {
				'FAQ/css/faq.css': 'FAQ/sass/faq.scss'
			}
		}
	},

  clean: {
      build: '<%= grunt.config("basePath").substring(0, 4) == "dist" ? "dist/**/*" : "null" %>',
      tmp: ['tmp'],
      html: [
        'FAQListing/views/*.html',
        '!FAQListing/views/FAQListingEditorView.html'
        ],
      js: [
        'FAQListing/controllers/*.js',
        '!FAQListing/controllers/faq.listing.editor.controller.js'
      ],
      css: [
        'FAQListing/css/*.css',
        '!FAQListing/css/faq.css'
      ],
	  sass: [
		'FAQ/sass/*.scss',
		'!FAQ/sass/faq.scss'
	  ]
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
        src: ['FAQ/Umbraco/FAQListing/FAQListing.csproj'],
        options: {
            projectConfiguration: 'Debug',
            targets: ['Clean', 'Rebuild'],
        }
    }
  }

  });

  grunt.registerTask('default', ['concat', 'sass:dist', 'copy:html', 'copy:manifest', 'copy:css', 'msbuild:dist', 'copy:dll', 'clean:html', 'clean:js', 'clean:css']);
  grunt.registerTask('umbraco', ['clean:tmp', 'default', 'copy:umbraco', 'umbracoPackage', 'clean:tmp']);
};
