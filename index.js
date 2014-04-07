var http = require("http");
module.exports = function() {
  var app = function(req, res, next) {
    app.handle(req,res,next);
  }

  app.stack = [];

  app.handle = function(req,res,out) {
    var index = 0,
      stack = this.stack;

      function next(err) {
	var layer = stack[index++];

	if(!layer) {
	  if(out) {
	    return out(err);
	  } else {
	      res.statusCode = err ? 500 : 404;
	      res.end();
	    }
	 } else {
	     try {
	       var arity = layer.length;
	       if (err) {
	         if (arity == 4) {
		   layer(err,req,res,next);
		 } else {
		     next(err);
		   }
		 } else if (arity < 4) {
		     layer(req,res,next);
		   } else {
		       next();
		     }
		} catch(e) {
		    next(e);
		  }
		}
	    }
	    next();
	}

	app.listen = function(port,callback) {
	  return http.createServer(this).listen(port,callback);
	}

	app.use = function(midd) {
	  this.stack.push(midd);
	    return this;
	};
  return app;
}
