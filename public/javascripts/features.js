var Features = (function (d3) {

 var Features = function(feature_list) {
    this.properties = {
      num_features: feature_list.length,
      features: feature_list.map((feature) => {
        return {
          name: feature,
          enabled: true
        }
      })
    };
    this._drawFeatures();
  }
  
  Features.prototype = {
    _drawFeatures: function() {
      let container = d3.select("#svg").select("g");
      for (var i = 0; i < this.properties.features.length; i++) {
        let feature = this.properties.features[i];
        let row = container.append('svg')
          .attr('x', 0)
          .attr('y', i*50 + 80)
          .attr('width', 150)
          .attr('height', 40)
          .on('mouseover', function(d) {
            row.style('cursor', 'pointer')
          })
          .on('click', () => {
            if (feature.enabled) {
              feature.enabled = false;
            }
            else {
              feature.enabled = true;
            }
            App.redraw();
          });
        row.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 150)
          .attr('height', 40)
        if (feature.enabled) {
          row.select('rect').attr('style', 'fill:#66B9BF;');
        }
        else {
          row.select('rect').attr('style', 'fill:lightgrey;');
        }
        row.append('text')
          .attr('x', 5)
          .attr('y', 24)
          .attr('style', 'fill:white;')
          .text(this.properties.features[i].name)
      }
    },

    _bundleFeatures: function() {
      return this.properties;
    }

  }

  return Features;
})(d3);
