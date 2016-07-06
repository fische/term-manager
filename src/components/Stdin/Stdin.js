import { React } from 'react-for-atom'
import { Writable } from 'stream'

const unicode = /U\+[0-9A-F]{4}/;

function checkUnicodeIdentifier(id: string): bool {
  return unicode.test(id);
}

function onKeyPress(s: Stdin) {
  return function(e) {
    //TODO handle combination with modifier keys
    s.write(String.fromCharCode(e.charCode));
  }
}

function onKeyDown(s: Stdin) {
  console.log(s);
  return function(e) {
    if (e.keyCode < 32 || !(checkUnicodeIdentifier(e.keyIdentifier))) {
      console.log("keydown", e);
      e.preventDefault();
    }
  }
}

export class Stdin extends React.Component {
  constructor(props: object) {
    super(props);

    this.in = props.in;
  }

  write(data: string) {
    this.in.write(data);
  }

  focus() {
    this.refs.stdin.focus();
  }

  blur() {
    this.refs.stdin.blur();
  }

  componentDidMount() {
    this.refs.stdin.addEventListener('keypress', onKeyPress(this));
    this.refs.stdin.addEventListener('keydown', onKeyDown(this));
  }

  render() {
    return (
      <input ref="stdin" />
    );
  }
}

Stdin.propTypes = {
  in: React.PropTypes.instanceOf(Writable).isRequired
};
