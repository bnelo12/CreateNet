var HiddenLayer = (function (d3, $) {
  var HiddenLayer = function(num_neurons) {
    this.properties = {
      num_neurons: num_neurons,
      neurons: []
    };
    for (var i = 0; i < num_neurons; i++) {
      this.properties.neurons.push(new Neuron);
    }
  };

  HiddenLayer.prototype = {
    drawHiddenLayer: function(cx, index) {
      let network = d3.select("#network");
      network.append("div")
        .attr("class", `ui-num-neurons`)
        .attr("id", `ui-num-neurons-${index}`)
        .style("left", `${cx-25}px`)
        .style("top", `40px`)
      let first_row =  d3.select(`#ui-num-neurons-${index}`)
      first_row.append("button")
        .attr("class", "mdl-button mdl-js-button mdl-button--icon ui-neuron-button")
          .style("background-color", "#E37222")
          .style("left", "-20px")
          .on("click", () => {
            this.addNeuron();
          })
          .append("i")
            .attr("class", "material-icons material-icons")
            .text("add");
      first_row.append("button")
          .attr("class", "mdl-button mdl-js-button mdl-button--icon ui-neuron-button")
            .style("background-color", "#07889B")
            .style("left", "20px")
            .on("click", () => {
              this.removeNeuron();
            })
            .append("i")
              .attr("class", "material-icons material-icons")
              .text("remove")
      for (var i = 0; i < this.properties.num_neurons; i++) {
        this.properties.neurons[i].drawNeuron(cx, i);
      }
    },

    addNeuron: function() {
      this.properties.num_neurons++;
      this.properties.neurons.push(new Neuron);
      App.redraw();
    },

    removeNeuron: function() {
      if (this.properties.num_neurons > 1) {
        this.properties.num_neurons--;
        this.properties.neurons.pop();
        App.redraw();
      }
    }
  }

  return HiddenLayer;
})(d3, $);