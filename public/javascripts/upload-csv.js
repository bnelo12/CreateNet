document.getElementById("csvfile").onchange = function () {
  var formData = new FormData();
  formData.append( 'csv',  $( '#csvfile' )[0].files[0] ); 
  $.ajax({
    url: 'csv-upload',
    type: 'POST',
    data: formData,
    success: function (features) {
      json_features = JSON.parse(features);
      for (var v in json_features) {
        $('.features-list').append(
          `
          <li class="mdl-list__item">
            <button class="mdl-button mdl-js-button mdl-button--icon" style="color: green">
              <i class="material-icons">check</i>
            </button>
            <span>` + json_features[v] + `</span>
          </li>
          `
        );
      }
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