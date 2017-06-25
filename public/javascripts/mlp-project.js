var MLPProject = (function($) {
  //MLPProject model
  var MLPProject = function() {
    //Public properties
    this.properties = {
      data: {
        type: '',
        file_name: '',
        training_to_test_ratio: 0,
        features: null,
        outputs: null
      }
    };

    //Event Listeners
    document.getElementById("csvfile").onchange = () => {this._importCSV()};

  };

  //prototype
  MLPProject.prototype = {

    constructor: MLPProject,

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
          this.properties.data.features = new Features(JSON.parse(features));
          this.properties.data.outputs = new Outputs(JSON.parse(features));
        },
        cache: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        processData: false
      });
      $('.mdl-upload-csv-card').html('<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>');
      $('.mdl-upload-csv-card').css("background-color", "white");
      componentHandler.upgradeElements($('.mdl-upload-csv-card'));
    }
  }
 
  return MLPProject;

})($);

