import * as React from 'react';
import { Props, State } from './types';
import handleChildrenTransitions from './children';

class Transition extends React.Component<Props, State> {
  static defaultProps = {
    flipMove: false,
    enterAfterExit: false,
    preEnterPose: 'exit',
    enterPose: 'enter',
    exitPose: 'exit'
  };

  state: State = {
    displayedChildren: [],
    finishedLeaving: {},
    hasInitialized: false,
    indexedChildren: {},
    scheduleChildRemoval: (key: string) => this.removeChild(key)
  };

  componentWillReceiveProps(nextProps) {
    this.setDerivedState(nextProps);
  }

  componentWillMount() {
    this.setDerivedState(this.props);
  }

  setDerivedState = (props = this.props) => {
    const derivedState = handleChildrenTransitions(props, this.state);

    if (derivedState !== this.state) {
      // @ts-ignore
      this.setState(derivedState);
    }
  };

  removeChild(key: string) {
    const { displayedChildren, finishedLeaving } = this.state;
    const { enterAfterExit, onRest } = this.props;
    if (!finishedLeaving.hasOwnProperty(key)) return;

    finishedLeaving[key] = true;

    if (
      !Object.keys(finishedLeaving).every(
        leavingKey => finishedLeaving[leavingKey]
      )
    ) {
      return;
    }

    const targetChildren = displayedChildren.filter(
      child => !finishedLeaving.hasOwnProperty(child.key)
    );

    const newState = enterAfterExit
      ? {
          finishedLeaving: {},
          ...handleChildrenTransitions(
            { ...this.props, enterAfterExit: false },
            { ...this.state, displayedChildren: targetChildren }
          )
        }
      : {
          finishedLeaving: {},
          displayedChildren: targetChildren
        };

    this.setState(newState as State, onRest);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state !== nextState;
  }

  render() {
    const { displayedChildren } = this.state;
    const hasChildren =
      Array.isArray(displayedChildren) && displayedChildren.length;

    return hasChildren ? (
      <div className="ReactPoseTransitionGroup">{displayedChildren}</div>
    ) : null;
  }
}

export default Transition;
