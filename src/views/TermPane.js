import {DockPaneView} from 'atom-bottom-dock'
import {$} from 'space-pen'

import {TerminalView} from './Terminal'

export class TermPaneView extends DockPaneView {
  initialize(emitter) {
    super.initialize();

    const self = this;
    this.terminalView.onExit(function() {
      emitter.emit('exit', self);
    });
    this.terminalView.show();
  }

  setActive(active)  {
    super.setActive(active);
    if (active)
      this.terminalView.focus();
    else
      this.terminalView.blur();
  }

  destroy() {
    this.terminalView.destroy();
    delete this.terminalView;
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
