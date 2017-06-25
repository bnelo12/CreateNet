var Features = (function ($) {
  
  var _buildFeatureHtml = function(feature) {
    return `
      <li class="feature selected" id=`+ feature + `>
        <button class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons material-icons">check</i>
        </button>
        <span>` + feature + `</span>
      </li>
    `;
  }

  var _appendFeatureToFeatureList = function(feature) {
    $('.features-list').append(
      _buildFeatureHtml(feature)
    );
  }

 var Features = function(feature_list) {
    this.properties = {
      all: feature_list,
      selected_features: feature_list
    };
    feature_list.forEach((feature) => {
        _appendFeatureToFeatureList(feature);
    });
  }
  
  Features.prototype = {

  }

  return Features;
})($);
