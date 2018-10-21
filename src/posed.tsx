import * as React from 'react';
import { ReactElement } from 'react';
import { PoseElement, PoseParentContext } from './components/PoseElement';
import supportedElements from './utils/supported-elements';
import {
  PoseElementProps,
  PoseContextProps
} from './components/PoseElement/types';
import { DomPopmotionConfig } from 'popmotion-pose';

type DomPopmotionConfigFactory<T> = (
  props: PoseElementProps & T
) => DomPopmotionConfig;

export type ComponentFactory<T> = (
  poseConfig?: DomPopmotionConfig | DomPopmotionConfigFactory<T>
) => (props: PoseElementProps & T) => ReactElement<T>;

export type Posed = {
  <T>(component: React.ComponentType<T>): ComponentFactory<T>;
  [key: string]: ComponentFactory<React.HTMLProps<any>>;
};

const componentCache = new Map<
  string | React.ComponentType,
  ComponentFactory<any>
>();

const createComponentFactory = (key: string | React.ComponentType) => {
  const componentFactory: ComponentFactory<any> = (poseConfig = {}) => {
    return ({ withParent = true, ...props }) => {
      return !withParent || props.parentValues ? (
        <PoseElement poseConfig={poseConfig} elementType={key} {...props} />
      ) : (
        <PoseParentContext.Consumer>
          {(parentCtx: PoseContextProps) => (
            <PoseElement
              poseConfig={poseConfig}
              elementType={key}
              {...props}
              {...parentCtx}
            />
          )}
        </PoseParentContext.Consumer>
      );
    };
  };

  componentCache.set(key, componentFactory);

  return componentFactory;
};

const getComponentFactory = (key: string | React.ComponentType) =>
  componentCache.has(key)
    ? componentCache.get(key)
    : createComponentFactory(key);

const posed = ((component: React.ComponentType | string) =>
  getComponentFactory(component)) as Posed;

supportedElements.reduce((acc, key) => {
  acc[key] = getComponentFactory(key);
  return acc;
}, posed);

export default posed;
