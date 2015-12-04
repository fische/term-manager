import {CompositeDisposable} from 'atom'
import {$, View} from 'space-pen'
import {InputTermController} from '../controllers/InputTerm'
import {OutputTermController} from '../controllers/OutputTerm'
import {spawn} from 'child_pty'

let tmp = $("<div>r</div>")
          .css({
            'position': 'absolute',
            'float': 'left',
            'white-space': 'nowrap',
            'visibility': 'hidden'
          });

function getColumns(div) {
  let font = div.css('font');
  tmp.css('font', font).appendTo($('body'));
  let width = tmp.width();
  tmp.remove();
  return (width == 0 ? 0 : Math.floor(div.width() / width));
}

function getRows(div) {
  let height = parseFloat(div.css('line-height'));
  return (height == 0 ? 0 : Math.floor(div.height() / height));
}

export class TerminalView extends View {
  /*
    Initialize subscriptions, max line cache, font size.
    Focus the stdin and set the font size of the output.
    Set then the event and the terminal.
  */
  initialize() {
    // TODO Option (max line cache)
    this.max = 1000

    // TODO Option (font size)
    this.font = 12

    this.subscriptions = new CompositeDisposable();

    this.output.css("font-size", this.font);
    this.stdin.focus();

    this.setEvent();
    this.setTerminal();
  }


  /*
    Add event to elem with handler as callback.
    Then add to subscriptions to be disposable.
  */
  addEventListener(elem, event, handler) {
    elem.on(event, handler);
    this.subscriptions.add({
      dispose: function() {
        elem.off(event, handler);
      }
    });
  }


  /*
    Set event of the terminal's output.
  */
  setEvent() {
    const self = this;
    this.addEventListener(this.output, 'click', function() {
      self.stdin.focus();
    });
    this.addEventListener(this.output, 'resize', function() {
      self.resize();
    });
  }


  /*
    Use json patch to update the output div with the output stream.
    Patch format :
      {
        deletion: Number of line to delete,
        addition: Array of index of the line to update
      }
  */
  _update(patch, output) {
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


  /*
    Spawn the child process using pty standard stream.
    Instantiate stdin and stdout streams.
    Pipe stdin stream to child process and child process stdout to stdout stream.
  */
  setTerminal() {
    const self = this;

    // TODO Option (cwd)
    this._child = spawn((process.env.SHELL ? process.env.SHELL : '/bin/sh'), []);
    this._inputController = new InputTermController(this.stdin);
    this._outputController = new OutputTermController({
      term: {
        max: this.max
      }
    });

    this._inputController
      .pipe(this._child.stdin);
    this._child.stdout
      .pipe(this._outputController)
      .on('update', function(patch) {
        self._update(patch, self._outputController);
        self.output.scrollTop(self.output[0].scrollHeight);
      });
  }


  /*
    Call emiExit argument when child process exits.
  */
  onExit(emitExit) {
    this._child.on('exit', emitExit);
  }


  /*
    Focus input and resize the terminal.
  */
  focus() {
    this.stdin.focus();

    this.resize();
    this.show();
  }


  /*
    Blur input.
  */
  blur() {
    this.stdin.blur();

    this.hide();
  }


  /*
    Resize child process terminal.
  */
  resize() {
    let cols, rows;
    cols = getColumns(this.output);
    rows = getRows(this.output);

    this._child.stdout.resize({
      columns: cols,
      rows: rows
    });
  }


  /*
    Dispose all events registered to subscriptions.
  */
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
