var express = require('express')
  , http = require('http')
  , mongoose = require('mongoose')
  , fs = require('fs')
  , passport = require('passport')
  , config = require('./config/config').production
  , mongoStore = require('connect-mongo')(express)
  , auth = require('./config/middlewares/authorization')
  , flash = require('connect-flash')

//Bootstrap models
  ,models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})
 // , models = require('./models')
  , routes = require('./routes')
  , app = express();
  app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());


    // cookieParser should be above session

  app.use(express.cookieParser("thissecretrocks"))

  // express/mongo session storage
  app.use(express.session({
    secret: "thissecretrocks",
    store: new mongoStore({
      url: config.db,
      collection : 'sessions'
    })
  }))
});
app.use(flash())

// use passport session
app.use(passport.initialize())
app.use(passport.session())

app.use(app.router);

app.configure('development', function () {
  app.use(express.errorHandler());
});


require('./config/passport')(passport, config)

routes.init(app, auth, passport);

var port = process.env.VCAP_APP_PORT || 3000;
if(process.env.VCAP_SERVICES){
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var dbcreds = services['mongodb'][0].credentials;
}
if(dbcreds){
  console.log(dbcreds);
  mongoose.connect(dbcreds.host, dbcreds.db, dbcreds.port, {user: dbcreds.username, pass: dbcreds.password});
}else{
  mongoose.connect("127.0.0.1", config.db.split("mongodb://localhost/")[1], 27017);
}

http.createServer(app).listen(port);
console.log("Express server listening on port" + port);
