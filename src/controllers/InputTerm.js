import {CompositeDisposable} from 'atom'
import {Readable} from 'stream'
import {KEYS_CMD, cmd_keymap} from './Keymap'

export class InputTermController extends Readable {
  constructor(source, options={}) {
    super(options);

    this._source = source;
    this._buffer = "";
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

  _getCommandMap(keyEvent, map) {
    if (keyEvent.ctrlKey) {
      keyEvent.ctrlKey = false;
      return this._getCommandMap(keyEvent, map.ctrl);
    } else if (keyEvent.altKey) {
      keyEvent.altKey = false;
      return this._getCommandMap(keyEvent, map.alt);
    } else if (keyEvent.shiftKey) {
      keyEvent.shiftKey = false;
      return this._getCommandMap(keyEvent, map.shift);
    }
    return (map !== undefined ? map.cmd : undefined);
  }

  _addToBuffer(c) {
    if (this._buffer.indexOf(c) == -1 && KEYS_CMD.indexOf(c) == -1) {
      this._buffer += c;
    }
  }

  setEvent() {
    const self = this;
    this.addEventListener(this._source, "keydown", function(event) {
      let c = String.fromCharCode(event.keyCode);
      self._addToBuffer(c);

      if (event.ctrlKey || event.altKey) { // Command keys
        let map = self._getCommandMap(event, cmd_keymap);
        if (map !== undefined && map[self._buffer] !== undefined)
          self.push(map[self._buffer]);
        event.preventDefault();
      } else if (event.keyCode <= 31 || event.keyCode == 127) { // Range of non-printable characters
        if (KEYS_CMD.indexOf(c) == -1) // Ignore command keys
          self.push(c);
        event.preventDefault();
      }
    });

    this.addEventListener(this._source, "keypress", function(event) {
      let c = String.fromCharCode(event.keyCode);
      self.push(c);
    });

    this.addEventListener(this._source, "keyup", function(event) {
      let c = String.fromCharCode(event.keyCode);
      if (self._buffer.indexOf(c) != -1) {
        self._buffer = self._buffer.replace(c, "");
      }
    });
  }

  _read(size: number) {

  }

  destroy() {
    this.subscriptions.dispose();
    delete this.subscriptions;
  }
}
