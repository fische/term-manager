import { React } from 'react-for-atom'
import { EventEmitter } from 'events'

import { Stdin } from '../Stdin/Stdin'

export class Terminal extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {
      lines: [
        "test",
        "fu"
      ],
      max: props.maxLines,
      font: props.fontSize
    };

    this.focus = this.focus.bind(this);
  }

  focus() {
    this.refs.stdin.focus();
  }

  blur() {
    this.refs.stdin.blur();
  }

  render() {
    return (
      <div ref="terminal" className="terminal" onClick={ this.focus }>
        <Stdin ref="stdin" />
      </div>
    );
  }
}

Terminal.propTypes = {
  emitter: React.PropTypes.instanceOf(EventEmitter).isRequired,
  maxLines: React.PropTypes.number,
  fontSize: React.PropTypes.number
};

// TODO Option (max line cache)
// TODO Option (font size)
Terminal.defaultProps = {
  maxLines: 200,
  fontSize: 12
};
