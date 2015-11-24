import pty from 'pty.js';
import {Transform} from 'stream';

export class TermController extends Transform {
  constructor(options={}) {
    super(options);

    this.exited = false;
    this.term = pty.spawn(process.env.SHELL, [], {
      name: (process.env.NAME ? process.env.NAME : 'xterm-color'),
      cols: options.term.cols,
      rows: options.term.rows,
      cwd: (process.env.HOME ? process.env.HOME : '/home'),
      env: (process.env ? process.env : {})
    });

    let self = this;
    this.term.on('data', function(data) {
      self.push(data);
    });

    this.term.on('exit', function() {
      self.exited = true;
      self.push(null);
    });
  }

  _transform(chunk, encoding, done) {
    if (this.exited != true)
      this.term.write(chunk);
    done();
  }
}
