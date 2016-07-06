import { React } from 'react-for-atom'

const unicode = /U\+[0-9A-F]{4}/;

function checkUnicodeIdentifier(id: string): bool {
  return unicode.test(id);
}

export class Stdin extends React.Component {
  constructor(props: object) {
    super(props);
  }

  focus() {
    this.refs.stdin.focus();
  }

  blur() {
    this.refs.stdin.blur();
  }

  onKeyPress(e) {
    console.log("keypress", e);
  }

  onKeyDown(e) {
    if (e.keyCode < 32 || !(checkUnicodeIdentifier(e.keyIdentifier))) {
      console.log("keydown", e);
      e.preventDefault();
    }
  }

  componentDidMount() {
    this.refs.stdin.addEventListener('keypress', this.onKeyPress);
    this.refs.stdin.addEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <input ref="stdin" />
    );
  }
}
