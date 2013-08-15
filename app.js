
/**
 * Module dependencies.
 */

var express = require('express'),
	config = require('./config'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose'),
	compiler = require('./handlebarsCompiler')(config.templates);

// models

var Todo = require('./models/todo')(mongoose);

// routes
var routes = require('./routes'),
	todoRoutes = require('./routes/todo')(Todo);


var app = express();

mongoose.connect(config.dbPath, function onMongooseError(err) {
    if (err) throw err;
  });

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

app.use(require('connect-assets')());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

compiler.compile();

app.get('/', routes.index);
app.get('/todos', todoRoutes.get);
app.get('/todos/:id', todoRoutes.get);
app.post('/todos', todoRoutes.create);
app.put('/todos/:id', todoRoutes.update);
app.delete('/todos/:id', todoRoutes.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
