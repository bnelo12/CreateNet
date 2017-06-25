var Neuron = (function (d3) {
	var Neuron = function() {
		this.properties = {
			cx: 0,
			cy: 0,
		};
	};

	Neuron.prototype = {
		drawNeuron: function(cx, index) {
			cy = 50*index+100;
			let svg = d3.select("#svg");
			let container = svg.select("g");
			container.append("circle")
		        .attr('cx', cx-10)
		        .attr('cy', 50*index+100)
		        .attr('r', 20)
		        .attr('fill', '#66B9BF')
		    this.properties.cx = cx;
		    this.properties.cy = cy;
		}
	}

	return Neuron;
})(d3);