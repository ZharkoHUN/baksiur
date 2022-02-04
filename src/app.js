import express from "express";
import morgan from "morgan";
import path from "path";
import { create } from "express-handlebars";
import session from "express-session";
import passport from "passport";
import { getFullnameFromID } from "./lib/passport.js";
import flash from "connect-flash";
import expressMySQLSession from "express-mysql-session";
import { database, port } from "./config";
import routes from "./routes";
import "./lib/passport";
import Handlebars from "handlebars";
const fileUpload = require('express-fileupload');



Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

Handlebars.registerHelper("dec", function(value, options)
{
    return parseInt(value) - 1;
});

Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if(a == b) // Or === depending on your needs
      return opts.fn(this);
  else
      return opts.inverse(this);
});

Handlebars.registerHelper('formatCurrency', function(value) {
  return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
});


// Intializations
const MySQLStore = expressMySQLSession(session);
const app = express();



// Settings
app.set("port", port);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  }).engine
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload());

app.use(
  session({
    secret: "faztmysqlnodemysql",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
});

// Routes
app.use(routes);

// Public
app.use('/uploads', express.static(__dirname + '../../uploads'));

app.use(express.static(path.join(__dirname, "public")));

export default app;
