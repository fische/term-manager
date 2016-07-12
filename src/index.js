import { CompositeDisposable } from 'atom'
import { EventEmitter } from 'events'
import { Pane } from './components/Pane/Pane'

module.exports = {
  termPanes: [],

  //TODO Rebuild all termPanes from state object
  activate: function() {
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
      'term-manager:add': (function(_this: object): () => void {
        return function() {
          _this.add();
        };
      })(this)
    }));
  },
  consumeBottomDock: function(bottomDock: any) {
    this.bottomDock = bottomDock;

    const self = this;
    this.paneEventEmitter = new EventEmitter();
    this.paneEventEmitter.on('exit', function(pane) {
      self.bottomDock.deletePane(pane.getId());
      delete self.termPanes[self.termPanes.indexOf(pane)];
    });

    this.add();
  },
  add: function() {
    if (this.bottomDock) {
      let newPane;
      newPane = new Pane(this.paneEventEmitter);
      this.termPanes.push(newPane);
      this.bottomDock.addPane(newPane, 'Term');
    }
  },
  deactivate: function() {
    this.subscriptions.dispose();
    delete this.subscriptions;

    let i,
      len,
      pane,
      ref;
    ref = this.termPanes;
    for (i = 0, len = ref.length; i < len; i++) {
      pane = ref[i];
      this.bottomDock.deletePane(pane.getId());
    }
    delete this.termPanes;
    delete this.paneEventEmitter;
  }
};
