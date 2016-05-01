import {CompositeDisposable} from 'atom'
import {EventEmitter} from 'events'

import {TermPaneView} from './views/TermPane'

module.exports = {
  activate: function(state) {
    this.termPanes = [];

    let packageFound;
    packageFound = atom.packages.getAvailablePackageNames().indexOf('bottom-dock') !== -1;
    if (!packageFound) {
      atom.notifications.addError('Could not find Bottom-Dock', {
        detail: 'Term-Manager: The bottom-dock package is a dependency.\nLearn more about bottom-dock here: https://atom.io/packages/bottom-dock',
        dismissable: true
      });
    }

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'term-manager:add': (function(_this) {
        return function() {
          return _this.add();
        };
      })(this),
      'term-manager:focus-active-term': (function(_this) {
        return function() {
          return _this.focusActiveTerm();
        };
      })(this)
    }));
  },
  consumeBottomDock: function(bottomDock) {
    this.bottomDock = bottomDock;

    const self = this;
    this.paneEventEmitter = new EventEmitter();
    this.paneEventEmitter.on('exit', function(pane) {
      self.bottomDock.deletePane(pane.getId());
      delete self.termPanes[self.termPanes.indexOf(pane)];
    });

    this.bottomDock.onDidFinishResizing(function() {
      let pane = self.bottomDock.getCurrentPane();
      if (pane instanceof TermPaneView)
        pane.resize();
    });

    this.add();
  },
  add: function() {
    if (this.bottomDock) {
      let config, newPane;
      newPane = new TermPaneView(this.paneEventEmitter);
      this.termPanes.push(newPane);
      config = {
        name: 'Term',
        id: newPane.getId(),
        active: newPane.isActive()
      };
      this.bottomDock.addPane(newPane, 'Term');
    }
  },
  focusActiveTerm: function() {
    if (this.bottomDock && this.bottomDock.isActive()) {
      let currentPane = this.bottomDock.getCurrentPane();
      if (currentPane instanceof TermPaneView) {
        currentPane.focus();
      }
    }
  },
  deactivate: function() {
    this.subscriptions.dispose();
    delete this.subscriptions;

    let i, len, pane, ref, results;
    ref = this.termPanes;
    for (i = 0, len = ref.length; i < len; i++) {
      pane = ref[i];
      this.bottomDock.deletePane(pane.getId());
    }
    delete this.termPanes;
    delete this.paneEventEmitter;
  }
};
