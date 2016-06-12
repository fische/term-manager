import { React } from 'react-for-atom'

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

  onKeyDown(e) {
    console.log(atom.keymaps.keystrokeForKeyboardEvent(e));
  }

  componentDidMount() {
    this.refs.stdin.addEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <input ref="stdin" />
    );
  }
}
