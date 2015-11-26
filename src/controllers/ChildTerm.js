import {TermController} from './Term'

let term = new TermController({
  term: {
    cols: 100,
    rows: 30
  }
});

process.stdin
  .pipe(term)
  .pipe(process.stdout);
