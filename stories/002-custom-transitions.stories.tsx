import * as React from 'react';
import { storiesOf } from '@storybook/react';
import posed from '../src/index';
import './base.css';

const stories = storiesOf('Custom transitions', module);

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

stories.add('Basic usage', () => {
  const Box = posed.div({
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        opacity: { ease: 'easeOut', duration: 300 },
        default: { ease: 'linear', duration: 500 }
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

stories.add('Transitions/Tween', () => {
  const Box = posed.div({
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        opacity: { ease: 'easeOut', duration: 300 },
        default: { ease: [0.01, 0.64, 0.99, 0.56], duration: 500 }
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

stories.add('Transitions/Spring', () => {
  const Box = posed.div({
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        opacity: { type: 'spring', stiffness: 100, duration: 300 },
        default: { type: 'spring', stiffness: 100, duration: 500 }
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

stories.add('Transitions/Physics', () => {
  const Box = posed.div({
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        type: 'physics',
        velocity: 5
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
