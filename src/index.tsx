import * as React from 'react';
import getNodeDimensions from 'get-node-dimensions';
import { InfiScrollerProps } from './types/components.type';
import { ScrollSpyInitConfig } from './interfaces/utils.interface';
import { uid, debounce, scrollSpy, isObj, isFunc } from './utils';

const { useEffect } = React;

const InfiScroller = (props: InfiScrollerProps) => {
  const { children, scrollTarget, debounceDelay, gutter, immediate, active, hasMore, shouldLoadMore, onLoadMore } = props;
  const hasScrollTarget = isObj(scrollTarget);

  const handleOnScroll = (scrollYOffset: number) => {
    const targetHeight = hasScrollTarget
      // @ts-ignore
      ? getNodeDimensions(scrollTarget).height
      : window.innerHeight;

    const scrollHeight = hasScrollTarget
      // @ts-ignore
      ? scrollTarget.scrollHeight
      : document.body.clientHeight;

    // @ts-ignore
    if (hasMore && shouldLoadMore(targetHeight, scrollYOffset, gutter, scrollHeight)) {
      onLoadMore();
    }
  };

  useEffect(() => {
    let debouncer: any = null;
    let scroller: any = null;

    if (active) {
      debouncer = debounce(uid(), debounceDelay);

      const initConfig: ScrollSpyInitConfig = {
        element: scrollTarget,
        immediate,
        onScroll: (scrollYOffset: number) => {
          const handleOnScrollCallback = () => handleOnScroll(scrollYOffset);

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
  shouldLoadMore: (targetHeight: number, scrollYOffset: number, gutter: number, scrollHeight: number) => (
    targetHeight + scrollYOffset + gutter >= scrollHeight
  )
};

export default InfiScroller;
