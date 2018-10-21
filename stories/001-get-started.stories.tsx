import * as React from 'react';
import { storiesOf } from '@storybook/react';
import posed from '../src/index';
import './base.css';

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

class Example extends React.Component {
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
    const { isVisible } = this.state;
    return <Box className="box" pose={isVisible ? 'visible' : 'hidden'} />;
  }
}

const stories = storiesOf('Get started', module);

stories.add('The "Hello World" animation', () => <Example />);
