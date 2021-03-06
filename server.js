/* example oauth general support client */

// 2012-08-01 (mca)

// pull in modules
var http = require("http");
var authom = require("authom");

// set shared vars
var server = http.createServer();
var port = process.env.PORT || 1337;
var questions = Buffer(
	"<html>" +
		"<body>" +
			"<h4>Links</h4>" +
			"<ul>" +
				"<li><a href='/auth/twitter'>Who am I on Twitter?</a></li>" +
				"<li><a href='/auth/github'>who am i on Github?</a></li>" +
				"<li><a href='/auth/layer7'>Layer 7 Data</a></li>" +
			"</ul>" +
			"</body>" +
	"</html>"
	);

// top-level handler
server.on("request", function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/html",
		"Content-Length": questions.length
  	});
  res.end(questions);
});


authom.createServer({
  service: "layer7",
  id: "040f891e-0cc7-4114-b80c-525a92be7e27",
  secret: "b06c39b6-b795-449c-8294-8a0e352dfa00",
  scope: "willow_testscope",
  state: "sports"
});

// github
authom.createServer({
  service: "github",
  id: "8fd3e3dafb8a7af5717d",
  secret: "7bec1919f3960bea3d14de3b6194e8e4b3abcbd1",
  state: 'sports'
});

// twitter
authom.createServer({
	service : "twitter",
	id : "kmKazK4bmb1KikkVTOwDiA",
	secret : "SwC8yrDIpYFG0XbIdipWnftsUIyRRkIF4MlTGsQAEs"
});

// handle success from oauth
authom.on("auth", function(req, res, data) {
	var answer = Buffer(
		"<html>" +
			"<body>" +
				"<div>You are " + data.id + " on " + data.service + ".</div>" +
				"<pre><code>" + JSON.stringify(data, null, 2) + "</code></pre>" +
			"</body>" +
		"</html>"
	);

	res.writeHead(200, {
		"Content-Type": "text/html",
		"Content-Length": answer.length
	});

	res.end(answer);
})

// handle fail from oauth
authom.on("error", function(req, res, data){
	data = Buffer("An error occurred: " + JSON.stringify(data));

	res.writeHead(500, {
		"Content-Type": "text/plain",
		"Content-Length": data.length
	});

	res.end(data);
})

// hoist listeners
authom.listen(server);
server.listen(port, function() {
	console.log("listening on port:"+port);
});

