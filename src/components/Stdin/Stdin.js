import { React } from 'react-for-atom'

export class Stdin extends React.Component {
  constructor(props: object) {
    super(props);
    console.log("constructor");
  }

  focus() {
    this.refs.stdin.focus();
  }

  blur() {
    this.refs.stdin.blur();
  }

  onKeyPress(e) {
    console.log(e);
  }

  render() {
    console.log("render");
    return (
      <input ref="stdin" onKeyPress={ this.onKeyPress.bind(this) } />
    );
  }
}
