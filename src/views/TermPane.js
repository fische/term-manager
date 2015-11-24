import {DockPaneView} from 'atom-bottom-dock'
import {Emitter, CompositeDisposable} from 'atom'
import {$} from 'space-pen'

import {TerminalView} from './Terminal'

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
  const self = this;
  return this.div({
    class: 'term-pane',
    style: 'display:flex;'
  }, function() {
    return self.subview('terminalView', new TerminalView());
  });
};
