import {$, View} from 'space-pen'

export class OutputView extends View {
  initialize() {

  }
}

OutputView.content = function() {
  const self = this;
  return this.div({
    class: 'output-view',
    style: 'display:flex;'
  }, function() {
  });
};
