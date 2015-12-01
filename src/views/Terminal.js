import {CompositeDisposable} from 'atom'
import {$, View} from 'space-pen'
import {InputTermController} from '../controllers/InputTerm'
import {OutputTermController} from '../controllers/OutputTerm'
import {spawn} from 'child_pty'


// TODO Option
let max = 1000;

export class TerminalView extends View {
  initialize() {
    this.subscriptions = new CompositeDisposable();

    this.stdin.focus();

    this.setEvent();
    this.setTerminal();
  }

  addEventListener(elem, event, handler) {
    elem.on(event, handler);
    this.subscriptions.add({
      dispose: function() {
        elem.off(event, handler);
      }
    });
  }

  setEvent() {
    const self = this;
    this.addEventListener(this.output, 'click', function() {
      self.stdin.focus();
    });
  }

  setTerminal() {
    const self = this;

    // TODO Options
    this._child = spawn((process.env.SHELL ? process.env.SHELL : '/bin/sh'), [], {
      name: (process.env.NAME ? process.env.NAME : 'xterm-color'),
      cols: 100,
      rows: 30,
      cwd: (process.env.HOME ? process.env.HOME : '/home'),
      env: (process.env ? process.env : {}),
      stdio: ['pty', 'pty', 'pty']
    });
    this._inputController = new InputTermController(this.stdin);
    this._outputController = new OutputTermController({
      term: {
        max: max
      }
    });

    this._inputController
      .pipe(this._child.stdin);
    this._child.stdout
      .pipe(this._outputController)
      .on('update', function(patch) {
        self.update(patch, self._outputController);
        self.output.scrollTop(self.output[0].scrollHeight);
      });
  }

  update(patch, output) {
    while (patch.deletion > 0) {
      this.output[0].children[0].remove();
      patch.deletion -= 1;
    }
    for (let line of patch.addition) {
      if (line >= 0) {
        if (line < this.output[0].children.length)
          this.output[0].children[line].innerHTML = output.getLine(line);
        else
          this.output.append("<div>" + output.getLine(line) + "</div>");
      }
    }
  }

  onExit(emitExit) {
    this._child.on('exit', emitExit);
  }

  destroy() {
    this.subscriptions.dispose();
    delete this.subscriptions;

    this._child.kill('SIGHUP');
    delete this._child;

    this._inputController.destroy();
    delete this._inputController;

    this._outputController.destroy();
    delete this._outputController;
  }
}

TerminalView.content = function() {
  const self = this;
  return this.div({
    class: 'terminal',
    style: 'display:flex;',
    tabindex: -1
  }, function() {
    self.input({
      class: 'input-keylistener',
      outlet: 'stdin',
      autofocus: true
    });
    return self.div({
      class: 'output',
      outlet: 'output'
    });
  });
};
