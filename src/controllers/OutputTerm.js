import {CompositeDisposable} from 'atom'
import {Writable} from 'stream'
import Convert from 'ansi-to-html'
let convert = new Convert();

export class OutputTermController extends Writable {
  constructor(options) {
    super(options);

    this.max = options.term.max;
    // TODO Initilaize the whole array
    this.output = [""];
    this.x = 0;
    this.y = 0;
  }

  _write(chunk, encoding, done) {
    let patch = this.formatToOutput(convert.toHtml(chunk.toString()));

    if (!(this.emit('update', patch))) {
      console.error("OutputTermController does not have any listeners.");
      console.info(`Chunk: \"${chunk}\" dropped !`);
    }
    done();
  }

  formatToOutput(data) {
    let line_modified = [];
    let line_deleted = 0;

    for (let c of data) {
      switch(c) {
        case "\x0d":
          if (this.output.length >= (this.max - 1)) {
            let inc = 0;
            while (this.output.length >= (this.max - 1)) {
              this.output.shift();
              this.y -= 1;
              inc += 1;
            }
            for (let line in line_modified)
              line_modified[line] -= inc;
            line_deleted += inc;
          }
          this.y += 1;
          this.x = 0;
          this.output.push("");
          break;
        default:
          this.output[this.y] = this.output[this.y].slice(0, this.x) + c + this.output[this.y].slice(this.x, this.output[this.y].length);
          this.x += 1;
          if (line_modified.indexOf(this.y) == -1)
            line_modified.push(this.y);
      }
    }
    return { addition: line_modified, deletion: line_deleted };
  }

  getLine(pos) {
    return this.output[pos];
  }

  destroy() {

  }
}
