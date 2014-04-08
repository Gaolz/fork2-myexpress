var Layer = require("./lib/layer");
var http = require("http");
<<<<<<< HEAD

var myexpress = function() {
	var app = function(req, res, next) {
		app.handle(req,res,next);
	}


	app.listen = function(port,callback) {
		return http.createServer(this).listen(port,callback);
	}

	app.stack = [];
	app.use = function(argv1, argv2) {
    var path = argv2? argv1 : "/";
    var f = argv2? argv2 : argv1;
    var layer = new Layer(path, f);
    this.stack.push(layer);
	};

	app.handle = function(req,res,out) {
		var index = 0;
		var	stack = this.stack;
=======
module.exports = function() {
  var app = function(req, res, next) {
    app.handle(req,res,next);
  }

  app.stack = [];

  app.handle = function(req,res,out) {
    var index = 0,
      stack = this.stack;
>>>>>>> 60d7acfdee612099c48bf3a88a3b81da8249f3d9

      function next(err) {
	var layer = stack[index++];

<<<<<<< HEAD
			if(!layer) {
				if(out) {
					return out(err);
				} 
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/html');
          res.end('500 - Internal Error');
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('404 - Not Found');
        }
        return;
			} 
				try {
          if (!layer.match(req.url))
            return next(err);
					var arity = layer.handle.length;
					if (err) {
						if (arity == 4) {
							layer.handle(err,req,res,next);
						} else {
							next(err);
						}
					} else if (arity < 4) {
						layer.handle(req,res,next);
					} else {
						next();
					}
				} catch(e) {
					next(e);
				}
=======
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
>>>>>>> 60d7acfdee612099c48bf3a88a3b81da8249f3d9
		}
	    }
	    next();
	}

<<<<<<< HEAD
	return app;
=======
	app.listen = function(port,callback) {
	  return http.createServer(this).listen(port,callback);
	}

	app.use = function(midd) {
	  this.stack.push(midd);
	    return this;
	};
  return app;
>>>>>>> 60d7acfdee612099c48bf3a88a3b81da8249f3d9
}

module.exports = myexpress;
