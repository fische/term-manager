import { React } from 'react-for-atom'
import { EventEmitter } from 'events'
import pty from 'pty.js'

import { Stdin } from '../Stdin/Stdin'

export class Terminal extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {
      max: props.maxLines,
      font: props.fontSize
    };

    this.focus = this.focus.bind(this);
    this.term = pty.spawn(process.env.SHELL, [], {
      name: process.env.TERM,
      cols: 80, //TODO detect cols
      rows: 30, //TODO detect rows
      cwd: process.env.HOME,
      env: process.env
    });
    this.term.on('data', function(data: string) {
      console.log(data);
    });
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
        <Stdin ref="stdin" in={ this.term } />
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
