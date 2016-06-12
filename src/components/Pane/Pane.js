import { React, ReactDOM } from 'react-for-atom'
import { DockPaneView } from 'atom-bottom-dock'
import { EventEmitter } from 'events'

import { Terminal } from '../Terminal/Terminal'

export class Pane extends DockPaneView {
  initialize(emitter: EventEmitter) {
    super.initialize();
    this.terminal = ReactDOM.render(<Terminal emitter={emitter} />, this.element);
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

  destroy() {}
}

Pane.content = function(): number {
  return this.div({
    class: "term-pane"
  });
};
