import {DockPaneView} from 'atom-bottom-dock'
import {$} from 'space-pen'

import {TerminalView} from './Terminal'

export class TermPaneView extends DockPaneView {
  /*
    Initialize Dock Pane View and emit exit event on exit.
  */
  initialize(emitter) {
    super.initialize();

    const self = this;
    this.terminalView.onExit(function() {
      emitter.emit('exit', self);
    });
    this.terminalView.show();
  }


  /*
    Set focus/blur Terminal view whether active arg is true or not.
  */
  setActive(active)  {
    super.setActive(active);
    if (active)
      this.terminalView.focus();
    else
      this.terminalView.blur();
  }


  /*
    Focus term
  */
  focus() {
    this.terminalView.focus();
  }


  /*
    Resize terminal view.
  */
  resize() {
    this.terminalView.resize();
  }


  /*
    Remove itself from bottom dock.
  */
  destroy() {
    this.terminalView.destroy();
    delete this.terminalView;
    this.remove();
  }
}

/*
  View setup of terminal pane.
*/
TermPaneView.content = function() {
  const self = this;
  return this.div({
    class: 'term-pane',
    outlet: 'termpane',
    style: 'display:flex;'
  }, function() {
    return self.subview('terminalView', new TerminalView());
  });
};
