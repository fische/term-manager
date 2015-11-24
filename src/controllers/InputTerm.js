import {CompositeDisposable} from 'atom'
import {Readable} from 'stream'

export class InputTermController extends Readable {
  constructor(source, options={}) {
    super(options);

    this._source = source;
    this.subscriptions = new CompositeDisposable();

    this.setEvent();
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
    this.addEventListener(this._source, "keydown", function(event) {
      let c = String.fromCharCode(event.keyCode);
      if (c == "\x0d") {
        self.push(new Buffer(c));
        event.preventDefault();
      }
    });
    this.addEventListener(this._source, "keypress", function(event) {
      self.push(new Buffer([event.keyCode]));
    });
  }

  _read(size: number) {

  }
}
