(function () {

  'use strict';

  /*******************************************************************
   * [ common ]
   ******************************************************************/
  let config = require('../../config.js');
  let gulp = require('gulp');
  let $ = require('gulp-load-plugins')();


  /*******************************************************************
   * [ variables ]
   ******************************************************************/
  let webpack = require('webpack');


  /*******************************************************************
   * [ task ]
   ******************************************************************/
  let uglifyProp = {
    compress: !config.isDebug,
    mangle: true,
    banner: config.banner,
    preserveComments: 'some'
  };

  let plugins = [];

  if (!config.isDebug) {
    plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }

  gulp.task('js', function () {

    // path 途中でパスを更新する為ローカル変数
    let app = config.path.app;
    let dev = config.path.dev;
    let assets = app + config.path.assets;
    let scripts = dev + config.path.js;
    let js = assets + config.path.js;


    let webpackProp = {
      entry: scripts + 'app.js',
      output: {
        filename: config.pkg.fileName + '.js'
      },
      resolve: {
        extensions: ["", ".js"]
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory=true'
          }
        ]
      },
      plugins: plugins
    };

    if (config.isDebug) {
      webpackProp.devtool = "#inline-source-map";
    }

    let g = gulp.src(config.path.js);

    if (config.isDebug) {
      g = g.pipe($.plumber());
    }

    g = g.pipe($.webpack(webpackProp));

    if (!config.isDebug) {
      g = g.pipe($.header(config.banner, {pkg: config.pkg}));
    }


    return g.pipe(gulp.dest(js));

  });



  /**
   *
   */
  gulp.task('js:libs', function () {

    // path 途中でパスを更新する為ローカル変数
    let app = config.path.app;
    let dev = config.path.dev;
    let assets = app + config.path.assets;
    let js = assets + config.path.js;

    return gulp.src(config.jsLibs.all)
      .pipe($.concat('libs.js'))
      .pipe(gulp.dest(js));
  });

}());

