const KEY_SHIFT = "\x10";
const KEY_CTRL = "\x11";
const KEY_ALT = "\x12";

export const KEYS_CMD = [KEY_SHIFT, KEY_CTRL, KEY_ALT];

const KEY_LEFT = "\x25";
const KEY_UP = "\x26";
const KEY_RIGHT = "\x27";
const KEY_DOWN = "\x28";

const KEY_END = "\x23";
const KEY_BEGIN = "\x24";

const KEY_DEL = "\x2e";

const KEY_PF1 = "\x70";
const KEY_PF2 = "\x71";
const KEY_PF3 = "\x72";
const KEY_PF4 = "\x73";
const KEY_PF5 = "\x74";
const KEY_PF6 = "\x75";
const KEY_PF7 = "\x76";
const KEY_PF8 = "\x77";
const KEY_PF9 = "\x78";
const KEY_PF10 = "\x79";
const KEY_PF11 = "\x7a";
const KEY_PF12 = "\x7b";

export let cmd_keymap = {
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
    },
    "alt": {
      "cmd": {},
      "shift": {
        "cmd": {}
      }
    },
    "shift": {
      "cmd": {}
    }
  },
  "alt": {
    "cmd": {},
    "shift": {
      "cmd": {}
    }
  }
};
