/* sample oauth implementation */
server = require("http").createServer();
authom = require("authom");

server.on("request", function() {
  // your usual server logic
})

// create servers for the services you'll be using
authom.createServer({ 
	service:'twitter',
	id:'kmKazK4bmb1KikkVTOwDiA',
	secret:'SwC8yrDIpYFG0XbIdipWnftsUIyRRkIF4MlTGsQAEs'
})

authom.on("auth", function(req, res, data) {
	console.log('auth: '+data.service);
})

authom.on("error", function(req, res, data) {
  // called when an error occurs during authentication
	console.log('error');
})

authom.listen(server)
server.listen(process.env.PORT||1337)
