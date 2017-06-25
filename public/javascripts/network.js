var Network = (function (d3) {
  var Network = function(features, outputs, num_hidden_layers) {
    this.properties = {
      num_hidden_layers: 2,
      features: features,
      outputs: outputs,
      hidden_layers: []
    };
    for (var v = 0; v < this.properties.num_hidden_layers; v++) {
      this.properties.hidden_layers.push(new HiddenLayer(2));
    }

    d3.select('#add-hidden-layer').on("click", () => {this._addHiddenLayer()})
    d3.select('#remove-hidden-layer').on("click", () => {this._removeHiddenLayer()})
  };

  Network.prototype = {
    _drawNetwork: function() {
      let svg = d3.select("#svg");
      svg.select("g.core").remove();
      d3.selectAll(".ui-num-neurons").remove();
      d3.select("#hidden-layers-title").text(`${this.properties.num_hidden_layers} HIDDEN LAYERS`)
      let co = d3.select(".network-view-outputs").node();
        let cf = d3.select(".network-view-features").node();
        let width = co.offsetLeft - cf.offsetLeft;
        svg.attr("width", width);
        let container = svg.append("g")
          .classed("core", true)
        let featureWidth = 200;
        let layerScale = d3.scalePoint()
          .domain(d3.range(0, this.properties.num_hidden_layers))
          .range([featureWidth+50, width-50])
          .round(true);
        for (var i = 0; i < this.properties.num_hidden_layers; i++) {
          this.properties.hidden_layers[i].drawHiddenLayer(layerScale(i), i);
        }
    },

    _addHiddenLayer: function() {
      this.properties.num_hidden_layers++;
      this.properties.hidden_layers.push(new HiddenLayer(2));
      App.redraw();
    },

    _removeHiddenLayer: function() {
      console.log("Hello");
      this.properties.num_hidden_layers--;
      this.properties.hidden_layers.pop();
      App.redraw();
    },

  }

  return Network;
})(d3);