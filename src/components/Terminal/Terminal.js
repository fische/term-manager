import { React } from 'react-for-atom'
import pty from 'pty.js'

import { Stdin } from '../Stdin/Stdin'

//TODO Handle exit (from atom + from pty)

export class Terminal extends React.Component {
  constructor(props: object) {
    super(props);

    this.state = {
      max: props.maxLines,
      font: props.fontSize
    };

    //Setup term
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
    this.term.on('exit', props.onExit);

    //Method Binding
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
        <Stdin ref="stdin" in={ this.term } />
      </div>
    );
  }
}

Terminal.propTypes = {
  onExit: React.PropTypes.func.isRequired,
  maxLines: React.PropTypes.number,
  fontSize: React.PropTypes.number
};

// TODO Option (max line cache)
// TODO Option (font size)
Terminal.defaultProps = {
  maxLines: 200,
  fontSize: 12
};
