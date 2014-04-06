var express = require("../")
var request = require("supertest")
	, expect = require("chai").expect
	, http = require("http");

describe("app", function() {
	var app = express();
	describe("create http server", function() {
		// write your test here
		var server = http.createServer(app);
		it("responds to /foo with 404", function(done) {
			request(server).get("/foo").expect(404).end(done);
		});
	});

	describe("#listen", function() {
		var port = 7000;
		var server;

		before(function(done) {
			server = app.listen(port, done);
		});
		it("should return an http.Server", function() {
			expect(server).to.be.instanceof(http.Server);
		});

		it("responds to /foo with 404", function(done) {
			request("http://localhost:" + port).get("/foo").expect(404).end(done);
		});
	});
});
