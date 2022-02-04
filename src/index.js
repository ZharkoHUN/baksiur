import app from "./app";

//app.listen(app.get("port"), "80.211.213.86");
app.listen(app.get("port"), "192.168.0.7");
console.log("Server is in port", app.get("port"));
//80.211.213.86

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