var Network = (function (d3) {
	var Network = function(features, outputs) {
		this.properties = {
			num_hidden_layers: 2,
			features: features,
			outputs: outputs,
			neurons: []
		};
		for (var i = 0; i < this.properties.num_hidden_layers; i++) {
			this.properties.neurons.push(0) 
		}
	};

	return Network;
})(d3);