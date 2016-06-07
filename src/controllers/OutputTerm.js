import {CompositeDisposable} from 'atom'
import {Writable} from 'stream'
import escape from 'escape-html'
import Convert from 'ansi-to-html'
let convert = new Convert();

export class OutputTermController extends Writable {
  constructor(options) {
    super(options);

    this.max = options.term.max;
    this.output = [""];
    this.x = 0;
    this.y = 0;
  }

  _write(chunk, encoding, done) {
    this.formatToOutput(convert.toHtml(escape(chunk.toString())));

    if (!(this.emit('update'))) {
      console.error("OutputTermController does not have any listeners.");
      console.info(`Chunk: \"${chunk}\" dropped !`);
    }
    done();
  }

  //TODO Interpret all special characters.
  //TODO Add colors (surround whole lines by <span style="color: white;"></span>)
  formatToOutput(data) {
    for (let c of data) {
      switch(c) {
        case "\x07":
          break;
        case "\x0d":
          this.x = 0;
          break;
        case "\x0a":
          while (this.output.length >= (this.max - 1)) {
            this.output.shift();
            this.y -= 1;
          }
          this.output.push("");
          this.y += 1;
          break;
        default:
          this.output[this.y] = this.output[this.y].slice(0, this.x) + c + this.output[this.y].slice(this.x, this.output[this.y].length);
          this.x += 1;
      }
    }
  }

  //TODO Make
  getOutput() {
    return "<span>" + this.output.join("<br/>") + "</span>";
  }

  destroy() {

  }
}
