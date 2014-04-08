var Layer = function(route, fn) {
  var layer = function() {};
  layer.route = route;
  layer.handle = fn;
  layer.match = function(route) {
    if (route.match(this.route)) {
      return {path: this.route};
    }
  }
  return layer;
}

module.exports = Layer;
