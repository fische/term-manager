import {CompositeDisposable} from 'atom'
import {Readable} from 'stream'

const SHIFT_KEY = "\x10";
const CTRL_KEY = "\x11";
const ALT_KEY = "\x12";
const CMD_KEYS = [SHIFT_KEY, CTRL_KEY, ALT_KEY];

let cmd_keymap = {
  "ctrl": {
    "cmd": {
      "A": "\x01",
      "B": "\x02",
      "C": "\x03",
      "D": "\x04",
      "E": "\x05",
      "F": "\x06",
      "G": "\x07",
      "H": "\x08",
      "I": "\x09",
      "J": "\x0a",
      "K": "\x0b",
      "L": "\x0c",
      "M": "\x0d",
      "N": "\x0e",
      "O": "\x0f",
      "P": "\x10",
      "Q": "\x11",
      "R": "\x12",
      "S": "\x13",
      "T": "\x14",
      "U": "\x15",
      "V": "\x16",
      "W": "\x17",
      "X": "\x18",
      "Y": "\x19",
      "Z": "\x1a",
      "[": "\x1b",
      "\\": "\x1c",
      "]": "\x1d",
      "^": "\x1e",
      "_": "\x1f"
    }
  }
};

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
    } else
      return (map.cmd);
  }

  _addToBuffer(c) {
    if (this._buffer.indexOf(c) == -1 && CMD_KEYS.indexOf(c) == -1) {
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
        if (CMD_KEYS.indexOf(c) == -1) // Ignore command keys
          self.push(self._buffer);
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
