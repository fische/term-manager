import {CompositeDisposable} from 'atom'
import {$, View} from 'space-pen'
import {InputTermController} from '../controllers/InputTerm'
import {TermController} from '../controllers/Term'
import {OutputTermController} from '../controllers/OutputTerm'


String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
}

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
    let self = this;
    this.addEventListener(this.output, 'click', function() {
      self.stdin.focus();
    });
  }

  setTerminal() {
    let input = new InputTermController(this.stdin);
    let output = new OutputTermController({
      term: {
        max: max
      }
    });
    // TODO Options
    let term = new TermController({
      term: {
        cols: 100,
        rows: 30
      }
    });

    let self = this;
    input
      .pipe(term)
      .pipe(output)
      .on('update', function(patch) {
        self.update(patch, output);
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
}

TerminalView.content = function() {
  let self = this;
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
