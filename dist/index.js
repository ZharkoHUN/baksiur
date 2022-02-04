"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

//app.listen(app.get("port"), "80.211.213.86");
_app["default"].listen(_app["default"].get("port"), "192.168.0.7");

console.log("Server is in port", _app["default"].get("port")); //80.211.213.86

/*
<VirtualHost *:80> 
  ProxyPreserveHost On
  ProxyRequests Off
  ServerName www.hpeti.hu
  ServerAlias hpeti.hu
</VirtualHost> 
  ProxyPass / http://hpeti.hu:8000/
  ProxyPassReverse / http://hpeti.hu:8000/
*/