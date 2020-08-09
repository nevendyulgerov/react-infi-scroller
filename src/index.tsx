import * as React from 'react';
import getNodeDimensions from 'get-node-dimensions';
import { uid, debounce, scrollSpy, isObj, isFunc, ScrollSpyInitConfig } from './utils';

const { useEffect } = React;

export type InfiScrollerProps = {
  children: JSX.Element | null,
  scrollTarget?: JSX.Element | null,
  debounceDelay?: number,
  gutter?: number,
  immediate?: boolean,
  active?: boolean,
  hasMore?: boolean,
  shouldLoadMore?: (
    targetHeight: number,
    scrollYOffset: number,
    gutter: number,
    scrollHeight: number
  ) => boolean,
  onLoadMore: () => void
}

const InfiScroller: React.FunctionComponent<InfiScrollerProps> = (props: InfiScrollerProps): JSX.Element | null => {
  const { children, scrollTarget, debounceDelay, gutter, immediate, active, hasMore, shouldLoadMore, onLoadMore } = props;
  const hasScrollTarget: boolean = isObj(scrollTarget);

  const handleOnScroll = (scrollYOffset: number): void => {
    const targetHeight: number = hasScrollTarget
      // @ts-ignore
      ? getNodeDimensions(scrollTarget).height
      : window.innerHeight;

    const scrollHeight: number = hasScrollTarget
      // @ts-ignore
      ? scrollTarget.scrollHeight
      : document.body.clientHeight;

    // @ts-ignore
    if (hasMore && shouldLoadMore(targetHeight, scrollYOffset, gutter, scrollHeight)) {
      onLoadMore();
    }
  };

  useEffect((): () => void => {
    let debouncer: any = null;
    let scroller: any = null;

    if (active) {
      debouncer = debounce(uid(), debounceDelay);

      const initConfig: ScrollSpyInitConfig = {
        element: scrollTarget,
        immediate,
        onScroll: (scrollYOffset: number) => {
          const handleOnScrollCallback: () => void = () => handleOnScroll(scrollYOffset);

          if (!isFunc(debouncer)) {
            handleOnScrollCallback();
          } else {
            debouncer(handleOnScrollCallback);
          }
        }
      };

      scroller = scrollSpy().init(initConfig);
    }

    return () => {
      if (isFunc(debouncer)) {
        debouncer = null;
        scroller.destroy();
        scroller = null;
      }
    };
  }, [children, active]);

  return children;
};

InfiScroller.defaultProps = {
  scrollTarget: null,
  debounceDelay: 300,
  gutter: 10,
  immediate: false,
  active: true,
  hasMore: false,
  shouldLoadMore: (
    targetHeight: number,
    scrollYOffset: number,
    gutter: number,
    scrollHeight: number
  ) => targetHeight + scrollYOffset + gutter >= scrollHeight
};

export default InfiScroller;
