var App = (function() {
  App = {
    project_name: 'test',
    project_type: 'MLPProject',
    project: new MLPProject()
  }

  App.redraw = function() {
  	this.project._drawNetwork();
  }

  return App
})();