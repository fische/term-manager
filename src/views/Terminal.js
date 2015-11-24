import {CompositeDisposable} from 'atom'
import {$, View} from 'space-pen'
import {InputTermController} from '../controllers/InputTerm'
import {TermController} from '../controllers/Term'
import {OutputTermController} from '../controllers/OutputTerm'

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
    let self = this;
    addEventListener(this.terminal, 'click', function() {
      self.stdin.focus();
    });
  }

  setTerminal() {
    let input = new InputTermController(this.stdin);
    let term = new TermController({
      term: {
        cols: 30,
        rows: 100
      }
    });
    let output = new OutputTermController({});
    let self = this;
    input
      .pipe(term)
      .pipe(output)
      .on('update', function() {
        self.output.html(output.getFormattedData());
        self.output.scrollTop(self.output[0].scrollHeight);
      });
  }
}

TerminalView.content = function() {
  let self = this;
  return this.div({
    class: 'terminal',
    style: 'display:flex;',
    outlet: 'terminal',
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
