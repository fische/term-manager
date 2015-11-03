var DockPaneView = require('atom-bottom-dock').DockPaneView;

var ref = require('atom');
var Emitter = ref.Emitter;
var CompositeDisposable = ref.CompositeDisposable;

var $ = require('space-pen').$;

export class TermPaneView extends DockPaneView {
  initialize() {
    super.initialize();
  }

  refresh() {}

  stop() {}

  clear() {}

  destroy() {
    this.remove();
  }
}

TermPaneView.content = function() {
  var self = this;
  return this.div({
    "class": 'term-pane',
    style: 'display:flex;'
  }, function() {

  });
};
