import * as React from 'react';
import { storiesOf } from '@storybook/react';
import posed from '../src/index';
import './base.css';

const stories = storiesOf('Dynamic Props', module);

class ExampleComponent extends React.Component {
  state = { isVisible: true };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    setInterval(() => {
      this.safeSetState({ isVisible: !this.state.isVisible });
    }, 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeSetState(newState: Object) {
    if (this._isMounted) {
      this.setState(newState);
    }
  }

  render() {
    return <div />;
  }
}

stories.add('Dynamic pose props', () => {
  const Box = posed.div({
    hidden: { scaleY: 0 },
    visible: {
      scaleY: props => 1, // Resolved on `visible` enter
      transition: {
        scaleY: props => ({ type: 'spring' }) // Resolved on `visible` enter
      }
    }
  });

  class Example extends ExampleComponent {
    render() {
      const { isVisible } = this.state;
      return <Box className="box" pose={isVisible ? 'visible' : 'hidden'} />;
    }
  }

  return <Example />;
});
