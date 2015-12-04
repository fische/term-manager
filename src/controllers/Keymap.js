const KEY_SHIFT = "\x10";
const KEY_CTRL = "\x11";
const KEY_ALT = "\x12";

export const KEYS_CMD = [KEY_SHIFT, KEY_CTRL, KEY_ALT];

export const KEYMAP_SPECIAL = {
  "\x25": "\x1b\x5b\x44", // LEFT
  "\x26": "\x1b\x5b\x41", // UP
  "\x27": "\x1b\x5b\x43", // RIGHT
  "\x28": "\x1b\x5b\x42", // DOWN

  "\x23": "\x1b\x5b\x46", // END
  "\x24": "\x1b\x5b\x45", // BEGIN

  "\x2e": "\x1b\x5b\x33\x7e", // DEL

  "\x70": "\x1b\x4f\x50", // F1
  "\x71": "\x1b\x4f\x51", // F2
  "\x72": "\x1b\x4f\x52", // F3
  "\x73": "\x1b\x4f\x53", // F4
  "\x74": "\x1b\x5b\x31\x35\x7e", // F5
  "\x75": "\x1b\x5b\x31\x37\x7e", // F6
  "\x76": "\x1b\x5b\x31\x38\x7e", // F7
  "\x77": "\x1b\x5b\x31\x39\x7e", // F8
  "\x78": "\x1b\x5b\x32\x30\x7e", // F9
  "\x79": "\x1b\x5b\x32\x31\x7e", // F10
  "\x7a": "\x1b\x5b\x32\x32\x7e", // F11
  "\x7b": "\x1b\x5b\x32\x34\x7e" // F12
};

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
