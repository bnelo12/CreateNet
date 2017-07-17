var MLPProject = (function($, d3) {
  //MLPProject model
  var MLPProject = function() {
    //Public properties
    this.properties = {
      data: {
        type: '',
        file_name: '',
        training_to_test_ratio: 0,
        features: null,
        outputs: null,
      },
      network: null,
      isRunning: false
    };

    //Event Listeners
    document.getElementById("csvfile").onchange = () => {this._importCSV()};
    d3.select('#network-run-button').on("click", () => {this._runClicked()})
  };

  //prototype
  MLPProject.prototype = {

    constructor: MLPProject,

    _drawNetwork: function() {
      if (this.properties.network) {
        this._stop();
        this.properties.network._drawNetwork();
        this.properties.data.features._drawFeatures();
        this.properties.data.outputs._drawOutputs();
        this._drawInputLinks();
        this._drawOuputLinks();
      }
    },

    _drawInputLinks: function() {
      for (var i = 0; i < this.properties.data.features.properties.num_features; i++) {
        let feature = this.properties.data.features.properties.features[i];
        let container = d3.select("#svg").select("g");
        if (feature.enabled) {
          let hidden_layer = this.properties.network.properties.hidden_layers[0];
          for (var j = 0; j < hidden_layer.properties.num_neurons; j++) {
            let neuron = hidden_layer.properties.neurons[j];
            let cx1 = 150;
            let cy1 = 100 + i*50;
            let cx2 = neuron.properties.cx-10;
            let cy2 = neuron.properties.cy;
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

    _drawOuputLinks: function() {
      for (var i = 0; i < this.properties.data.outputs.properties.num_outputs; i++) {
        let output = this.properties.data.outputs.properties.outputs[i];
        let cx = this.properties.data.outputs.properties.cx;
        let container = d3.select("#svg").select("g");
        if (output.enabled) {
          let hidden_layer = this.properties.network.properties.hidden_layers[
            this.properties.network.properties.num_hidden_layers-1
          ];
          for (var j = 0; j < hidden_layer.properties.num_neurons; j++) {
            let neuron = hidden_layer.properties.neurons[j];
            let cx2 = cx;
            let cy2 = 100 + i*50;
            let cx1 = neuron.properties.cx-10;
            let cy1 = neuron.properties.cy;
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

    _importCSV: function() {
      var formData = new FormData();
      formData.append('csv', $('#csvfile')[0].files[0]); 
      this.properties.data.type = 'CSV';
      this.properties.data.file_name = $('#csvfile')[0].files[0].name;
      this.properties.data.training_to_test_ratio = 0.2
      $.ajax({
        url: 'csv-upload',
        type: 'POST',
        data: formData,
        success: (features) => {
          f = new Features(JSON.parse(features));
          o = new Outputs(JSON.parse(features));
          this.properties.data.features = f;
          this.properties.data.outputs = o;
          this.properties.network = new Network(f, o);
          this._drawNetwork();
          d3.select("#data-cell").remove();
        },
        cache: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        processData: false
      });
      $('.mdl-upload-csv-card').html('<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>');
      $('.mdl-upload-csv-card').css("background-color", "white");
      componentHandler.upgradeElements($('.mdl-upload-csv-card'));
    },

    _runClicked: function() {
      // Start Training
      if (!this.properties.isRunning && this.properties.network) {
        this._run();
      }
      // Stop Training
      else if (this.properties.network) {
        this._stop();
      }
    },

    _run: function() {
      d3.select('#network-run-button').select('button').select('i')
        .text('stop');
      this.properties.network._startLinkAnimation();
      this._post_network();
      this.properties.isRunning = true;
    },

    _stop: function() {
      d3.select('#network-run-button').select('button').select('i')
        .text('play_arrow');
      this.properties.network._stopLinkAnimation();
      this.properties.isRunning = false;
    },

    _post_network: function() {
      $.ajax({
        url: 'network-upload',
        type: 'POST',
        data: {network: this._bundleMLPNetwork()},
        success: (response) => {
        },
        error: (xhr, status, error) => {
          alert("Error uploading network: " + error);
        }
      });
    },

    _bundleMLPNetwork: function() {
      var bundle = {};
      bundle['file_name'] = this.properties.data.file_name;
      bundle['network'] = this.properties.network._bundleNetwork();
      bundle['features'] = this.properties.data.features._bundleFeatures();
      bundle['outputs'] = this.properties.data.outputs._bundleOutputs();
      return JSON.stringify(bundle);
    }
  }
 
  return MLPProject;

})($, d3);

