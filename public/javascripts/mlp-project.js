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
        this.properties.network._drawNetwork();
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
      this.properties.isRunning = true;
    },

    _stop: function() {
      d3.select('#network-run-button').select('button').select('i')
        .text('play_arrow');
      this.properties.network._stopLinkAnimation();
      this.properties.isRunning = false;
    }
  }
 
  return MLPProject;

})($, d3);

