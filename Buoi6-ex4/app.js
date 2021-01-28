var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const validator = require('express-validator');
const session = require('express-session');
const flash = require('express-flash-notification');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
var moment = require('moment');

const pathConfig = require('./path');

// Define Path
global.__base           = __dirname + '/';
global.__path_app       = __base + pathConfig.folder_app + '/';
global.__path_configs   = __path_app + pathConfig.folder_configs + '/';
global.__path_helpers   = __path_app + pathConfig.folder_helpers + '/';
global.__path_routers   = __path_app + pathConfig.folder_routers + '/';
global.__path_schemas   = __path_app + pathConfig.folder_schemas + '/';
global.__path_models    = __path_app + pathConfig.folder_models + '/';
global.__path_validates = __path_app + pathConfig.folder_validates + '/';
global.__path_views     = __path_app + pathConfig.folder_views + '/';
global.__path_views_admin = __path_views + pathConfig.folder_module_admin + '/';
global.__path_views_blog  = __path_views + pathConfig.folder_module_blog + '/';
global.__path_public    = __base + pathConfig.folder_public + '/';
global.__path_uploads     = __path_public + pathConfig.folder_uploads + '/';
global.__path_middleware= __path_app + pathConfig.folder_middleware + '/';


const systemConfig = require(__path_configs + 'system');
const databaseConfig = require(__path_configs + 'database');

// mongoose.connect(`mongodb+srv://admin:FC9sz7viteURvwgy@cluster0.wrsms.mongodb.net/training_nodejs?retryWrites=false&w=majority`);

// mongoose.connect(`mongodb://${databaseConfig.username}:${databaseConfig.password}@ds117590.mlab.com:17590/${databaseConfig.database}`);

mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.3qeuo.mongodb.net/${databaseConfig.database}?retryWrites=false&w=majority`);


var app = express();
app.use(cookieParser());
app.use(session({
  secret: 'abcnhds',
  resave: false,
  saveUninitialized: true}
));
app.use(flash(app, {
   viewName: __path_views_admin + 'elements/notify',
 }));
 
app.use(validator({
  customValidators: {
    isNotEqual: (value1, value2) => {
      return value1!==value2;
    }
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
// app.set('layout', __path_views + 'backend');
app.set('layout', __path_views_admin + 'admin');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Local variable
app.locals.systemConfig = systemConfig;
app.locals.moment = moment;

// Setup router
app.use(`/${systemConfig.prefixAdmin}`, require(__path_routers + 'backend/index'));
app.use(`/${systemConfig.prefixBlog}`, require(__path_routers + 'frontend/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(__path_views_admin +  'pages/error', { pageTitle   : 'Page Not Found ' });
});

module.exports = app;

