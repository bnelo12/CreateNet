var Outputs = (function (d3) {

 var Outputs = function(output_list) {
    this.properties = {
      num_outputs: output_list.length,
      outputs: output_list.map((output) => {
        return {
          name: output,
          enabled: false
        }
      }),
      cx: 0
    };
    this._drawOutputs();
  }
  
  Outputs.prototype = {
    _drawOutputs: function() {
      let container = d3.select("#svg").select("g");
      for (var i = 0; i < this.properties.outputs.length; i++) {
        let output = this.properties.outputs[i];
        let cx = d3.select(".network-view-outputs").node().offsetLeft - 50;
        this.properties.cx = cx;
        let row = container.append('svg')
          .attr('x', cx)
          .attr('y', i*50 + 80)
          .attr('width', 150)
          .attr('height', 40)
          .on('mouseover', function(d) {
            row.style('cursor', 'pointer')
          })
          .on('click', () => {
            if (output.enabled) {
              output.enabled = false;
            }
            else {
              output.enabled = true;
            }
            App.redraw();
          });
        row.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 150)
          .attr('height', 40)
        if (output.enabled) {
          row.select('rect').attr('style', 'fill:#66B9BF;');
        }
        else {
          row.select('rect').attr('style', 'fill:lightgrey;');
        }
        row.append('text')
          .attr('x', 5)
          .attr('y', 24)
          .attr('style', 'fill:white;')
          .text(this.properties.outputs[i].name)
      }
    },

    _bundleOutputs: function() {
      return this.properties;
    }
  }

  return Outputs;
})(d3);
