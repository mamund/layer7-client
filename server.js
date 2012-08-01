/* example oauth general support client */
// 2012-08-01 (mca)

var http = require("http")
  , authom = require("authom")
  , server = http.createServer()
  , port = process.env.PORT || 1337

  , questions = Buffer(
      "<html>" +
        "<body>" +
          "<h4><a href='/auth/twitter'>Who am I on Twitter?</a></h4>" +
        "</body>" +
      "</html>"
    );

server.on("request", function(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": questions.length
  });
  res.end(questions);
});

authom.createServer({
	service : "twitter",
	id : "kmKazK4bmb1KikkVTOwDiA",
	secret : "SwC8yrDIpYFG0XbIdipWnftsUIyRRkIF4MlTGsQAEs"
});
/*
authom.createServer({
  service: "github",
  id: "7e38d12b740a339b2d31",
  secret: "116e41bd4cd160b7fae2fe8cc79c136a884928c3"
})

authom.createServer({
  service: "google",
  id: "515913292583.apps.googleusercontent.com",
  secret: "UAjUGd_MD9Bkho-kazmJ5Icm"
})

authom.createServer({
  service: "facebook",
  id: "256546891060909",
  secret: "e002572fb07423fa66fc38c25c9f49ad"
})

authom.createServer({
  service: "foursquare",
  id: "0DPGLE430Y2LFUCOSFXB0ACG3GGD5DNHH5335FLT4US1QDAZ",
  secret: "WLNCAVFHCMQGVYOZTNOLPXW0XL2KN0DRD1APOA45SRGEZSGK"
})

authom.createServer({
  service: "instagram",
  id: "e55497d0ebc24289aba4e715f1ab7d2a",
  secret: "a0e7064bfda64e57a46dcdba48378776"
})

authom.createServer({
  service: "meetup",
  id: "t2glfik2ff9e56ajs560fouf0f",
  secret: "q103560uihj1sp1dv08ae3ch5v"
})

authom.createServer({
  service: "gowalla",
  id: "b8514b75c2674916b77c9a913783b9c2",
  secret: "34f713fdd6b4488982328487f443bd6d"
})

authom.createServer({
  service: "37signals",
  id: "c2098292571a03070eb12746353997fb8d6f0e00",
  secret: "4cb7f46fa83f73ec99d37162b946522b9e7a4d5a"
})

authom.createServer({
  service: "soundcloud",
  id: "9e5e7b0a891b4a2b13aeae9e5b0c89bb",
  secret: "2f4df63c8ff10f466685c305e87eba6f"
})

authom.createServer({
  service: "windowslive",
  id: "000000004C06BA3A",
  secret: "2RsIhweMq6PxR8jc5CjTVoCqTvKZmctY",
  scope: "wl.basic"
})

authom.createServer({
  service: "dwolla",
  id: "0vNUP/9/GSBXEv69nqKZVfhSZbw8XQdnDiatyXSTM7vW1WzAAU",
  secret: "KI2tdLiRZ813aclUxTgUVyDbxysoJQzPBjHTJ111nHMNdAVlcs",
  scope:"AccountInfoFull"
})

authom.createServer({
  service: "twitter",
  id: "LwjCfHAugMghuYtHLS9Ugw",
  secret: "etam3XHqDSDPceyHti6tRQGoywiISY0vZWfzhQUxGL4"
})
*/

authom.on("auth", function(req, res, data) {
  var answer = Buffer(
    "<html>" +
      "<body>" +
        "<div>You are " + data.id + " on " + data.service + ".</div>" +
        "<pre><code>" + JSON.stringify(data, null, 2) + "</code></pre>" +
      "</body>" +
    "</html>"
  )

  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": answer.length
  })

  res.end(answer)
})

authom.on("error", function(req, res, data){
  data = Buffer("An error occurred: " + JSON.stringify(data))

  res.writeHead(500, {
    "Content-Type": "text/plain",
    "Content-Length": data.length
  })

  res.end(data)
})

authom.listen(server)
server.listen(port, function() {
  console.log("listening at http://authom.jedschmidt.com/")
})

