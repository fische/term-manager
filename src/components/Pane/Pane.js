import { React, ReactDOM } from 'react-for-atom'
import { DockPaneView } from 'atom-bottom-dock'
import { EventEmitter } from 'events'

import { Terminal } from '../Terminal/Terminal'

export class Pane extends DockPaneView {
  initialize(emitter: EventEmitter) {
    super.initialize();

    const self = this;

    let exit = function() {
      emitter.emit('exit', self);
    };
    this.terminal = ReactDOM.render(<Terminal onExit={exit} />, this.element);
  }

  setActive(active: boolean) {
    super.setActive(active);
    if (this.terminal) {
      if (active) {
        this.terminal.focus();
      } else {
        this.terminal.blur();
      }
    }
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}

Pane.content = function(): number {
  return this.div({
    class: "term-pane"
  });
};
