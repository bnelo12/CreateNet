var Outputs = (function ($) {
  
  var _buildOutputHtml = function(output) {
    return `
      <li class="mdl-list__item output " id="`+ output + `">
        <button class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons feature-icon ` + output + `">check</i>
        </button>
        <span>` + output + `</span>
      </li>
    `;
  }

  var _appendOutputToOutputList = function(output) {
    $('.outputs-list').append(
      _buildOutputHtml(output)
    );
  }

 var Outputs = function(output_list) {
    this.properties = {
      all: output_list,
      selected_outputs: []
    };
    output_list.forEach((output) => {
        _appendOutputToOutputList(output);
    });
  }
  
  Outputs.prototype = {

  }

  return Outputs;
})($);
