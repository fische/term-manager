import {CompositeDisposable} from 'atom'

import {TermPaneView} from './views/TermPane'

module.exports = {
  activate: function(state) {
    let packageFound;
    this.subscriptions = new CompositeDisposable();
    this.termPanes = [];
    packageFound = atom.packages.getAvailablePackageNames().indexOf('bottom-dock') !== -1;
    if (!packageFound) {
      atom.notifications.addError('Could not find Bottom-Dock', {
        detail: 'Term-Manager: The bottom-dock package is a dependency. \n Learn more about bottom-dock here: https://atom.io/packages/bottom-dock',
        dismissable: true
      });
    }
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'term-manager:add': (function(_this) {
        return function() {
          return _this.add();
        };
      })(this)
    }));
  },
  consumeBottomDock: function(bottomDock) {
    this.bottomDock = bottomDock;
    return this.add();
  },
  add: function() {
    var config, newPane;
    if (this.bottomDock) {
      newPane = new TermPaneView();
      this.termPanes.push(newPane);
      config = {
        name: 'Term',
        id: newPane.getId(),
        active: newPane.isActive()
      };
      return this.bottomDock.addPane(newPane, 'Term');
    }
  },
  deactivate: function() {
    var i, len, pane, ref, results;
    this.subscriptions.dispose();
    ref = this.termPanes;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      pane = ref[i];
      results.push(this.bottomDock.deletePane(pane.getId()));
    }
    return results;
  }
};
