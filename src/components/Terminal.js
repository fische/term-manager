import {React} from 'react-for-atom'
import { EventEmitter } from 'events'

export class Terminal extends React.Component {
  /*
    Initialize subscriptions, max line cache, font size.
    Focus the stdin and set the font size of the output.
    Set then the event and the terminal.
  */
  constructor(props: object) {
    super(props);

    this.max = props.maxLines

    this.font = props.fontSize
  }

  render() {
    return <div>terminal</div>
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
