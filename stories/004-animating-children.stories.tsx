import * as React from 'react';
import { storiesOf } from '@storybook/react';
import posed from '../src/index';
import './children.css';

const stories = storiesOf('Animating children', module);

const Sidebar = posed.ul({
  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: '-100%', delay: 300 }
});

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

class Example extends React.PureComponent {
  state = { isOpen: false };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    setTimeout(this.toggle, 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeSetState(newState: Object) {
    if (this._isMounted) {
      this.setState(newState);
    }
  }

  toggle = () => this.safeSetState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;

    return (
      <Sidebar className="sidebar" pose={isOpen ? 'open' : 'closed'}>
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
      </Sidebar>
    );
  }
}

stories.add('Example', () => <Example />);
