import { React, ReactDOM } from 'react-for-atom'

import { DockPaneView } from 'atom-bottom-dock'
import { EventEmitter } from 'events'

import {Terminal} from './Terminal'

export class TermPane extends DockPaneView {
  /*
    Initializes Dock Pane View.
  */
  initialize(emitter: EventEmitter) {
    super.initialize();
    ReactDOM.render(<Terminal emitter={emitter} />, this.element);
  }

  // /*
  //   Set focus/blur Terminal view whether active arg is true or not.
  // */
  // setActive(active: bool) {
  //   super.setActive(active);
  //   // if (active)
  //   //   this.terminalView.focus();
  //   // else
  //   //   this.terminalView.blur();
  // }
  //
  //
  // /*
  //   Focus term
  // */
  // focus() {
  //   // this.terminalView.focus();
  // }
  //
  //
  // /*
  //   Resize terminal view.
  // */
  // resize() {
  //   // this.terminalView.resize();
  // }
  //
  //
  // /*
  //   Remove itself from bottom dock.
  // */
  // destroy() {
  //   // this.terminalView.destroy();
  //   // delete this.terminalView;
  //   // this.remove();
  // }
}

TermPane.content = function(): number {
  return this.div({
    class: "term-pane"
  });
};
