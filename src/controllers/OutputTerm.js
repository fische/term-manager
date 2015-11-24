import {CompositeDisposable} from 'atom'
import {Writable} from 'stream'
import Convert from 'ansi-to-html'
let convert = new Convert();

export class OutputTermController extends Writable {
  constructor(options={}) {
    super(options);
    this.output = [""];
    this.x = 0;
    this.y = 0;
  }

  _write(chunk, encoding, done) {
    this.formatToOutput(convert.toHtml(chunk.toString()));

    if (!(this.emit('update')))
      console.error("OutputTermController does not have any listeners.");
    done();
  }

  formatToOutput(data) {
    for (let c of data) {
      switch(c) {
        case "\x0d":
          this.y += 1;
          this.x = 0;
          this.output.push("");
          break;
        default:
          this.output[this.y] = this.output[this.y].slice(0, this.x) + c + this.output[this.y].slice(this.x, this.output[this.y].length);
          this.x += 1;
      }
    }
  }

  getFormattedData() {
    return "<div>" + this.output.join("</div><div>") + "</div>";
  }
}
