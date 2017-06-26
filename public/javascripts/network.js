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
        this._drawLinks(container);
    },

    _drawLinks: function(container) {
      let svg = d3.select("#svg");
      for (var i = 0; i < this.properties.num_hidden_layers-1; i++) {
        for (var j = 0; j < this.properties.hidden_layers[i].properties.num_neurons; j++) {
          for (var k = 0; k < this.properties.hidden_layers[i+1].properties.num_neurons; k++) {
            let cx1 = this.properties.hidden_layers[i].properties.neurons[j].properties.cx-10;
            let cy1 = this.properties.hidden_layers[i].properties.neurons[j].properties.cy;
            let cx2 = this.properties.hidden_layers[i+1].properties.neurons[k].properties.cx-10;
            let cy2 = this.properties.hidden_layers[i+1].properties.neurons[k].properties.cy;
            let line = d3.path()
            line.moveTo(cx1, cy1);
            line.bezierCurveTo(cx1+(cx2-cx1)/2, cy1, cx2-(cx2-cx1)/2, cy2, cx2, cy2);
            container.insert("path", ":first-child")
              .attr("d", line.toString())
              .attr("stroke", "grey")
              .attr("fill", "none")
              .attr("stroke-dasharray", "5,5")
              .attr("stroke-width", "1");
          }
        }
      }
    },

    _addHiddenLayer: function() {
      this.properties.num_hidden_layers++;
      this.properties.hidden_layers.push(new HiddenLayer(2));
      App.redraw();
    },

    _removeHiddenLayer: function() {
      this.properties.num_hidden_layers--;
      this.properties.hidden_layers.pop();
      App.redraw();
    },

  }

  return Network;
})(d3);