import * as React from 'react';
import { storiesOf } from '@storybook/react';
import posed from '../src/index';
import './base.css';

const Box = posed.div({
  fullscreen: {
    width: '100vw',
    height: '100vh',
    transition: { type: 'tween' },
    flip: true
  },
  thumbnail: {
    width: 100,
    height: 100,
    transition: { type: 'tween' },
    flip: true
  }
});

interface State {
  isFull: boolean;
}

class Example extends React.Component<{}, State> {
  state = { isFull: false };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeSetState(newState: State) {
    if (this._isMounted) {
      this.setState(newState);
    }
  }

  handleOnClick = () => {
    this.safeSetState({
      isFull: !this.state.isFull
    });
  };

  render() {
    const { isFull } = this.state;
    return (
      <Box
        className="box"
        pose={isFull ? 'fullscreen' : 'thumbnail'}
        onClick={this.handleOnClick}
      />
    );
  }
}

const stories = storiesOf('Flip', module);

stories.add('width/top', () => <Example />);
