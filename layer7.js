var OAuth2 = require("./oauth2")

/*
https://hq.layer7tech.com:7443/auth/oauth/v2/authorize?response_type=code&client_id=[your client id&redirect_uri=[your redirect url]&authcode&scope=willow_testscope&state=sports
*/
function Github(options) {
  ["code", "token", "user"].forEach(function(name) {
    this[name] = Object.create(this[name])
  }, this)

  this.code.query = {
    client_id: options.id,
    scope: options.scope || [],
    state: options.state || [],
    response_type: 'code'
  }

  this.token.query = {
    client_id: options.id,
    client_secret: options.secret
  }

  this.user.query = {}

  this.on("request", this.onRequest.bind(this))
}

Github.prototype = new OAuth2

Github.prototype.code = {
  protocol: "https",
  host: "hq.layer7tech.com:7443",
  pathname: "/auth/oauth/v2/authorize"
}

Github.prototype.token = {
  method: "POST",
  host:   "https://hq.layer7tech.com:7443",
  path:   "/auth/oauth/v2/token"
}

Github.prototype.user = {
  host: "api.github.com",
  path: "/user"
}

module.exports = Github
