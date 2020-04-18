import * as React from 'react';
import * as PropTypes from 'prop-types';
import getNodeDimensions from 'get-node-dimensions';
import { uid, debounce, scrollSpy, ScrollSpyInitConfig, isObj, isFunc } from './utils';

const { useEffect } = React;

export type InfiScrollerProps = {
  children: React.ReactNode | React.ReactNodeArray,
  scrollTarget?: React.ReactNode | null,
  debounceDelay?: number,
  gutter?: number,
  immediate?: boolean,
  active?: boolean,
  hasMore?: boolean,
  shouldLoadMore?: (targetHeight: number, scrollYOffset: number, gutter: number, scrollHeight: number) => boolean,
  onLoadMore: () => void
}

const InfiScroller = (props: InfiScrollerProps) => {
  const { children, scrollTarget, debounceDelay, gutter, immediate, active, hasMore, shouldLoadMore, onLoadMore } = props;
  const hasScrollTarget = isObj(scrollTarget);
  const handleOnScroll = (scrollYOffset: number) => {
    // @ts-ignore
    const targetHeight = hasScrollTarget ? getNodeDimensions(scrollTarget).height : window.innerHeight;
    // @ts-ignore
    const scrollHeight = hasScrollTarget ? scrollTarget.scrollHeight : document.body.clientHeight;
    // @ts-ignore
    const canLoadMore = shouldLoadMore(targetHeight, scrollYOffset, gutter, scrollHeight);

    if (hasMore && canLoadMore) {
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

  return (
    <>
      {children}
    </>
  );
};

InfiScroller.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  scrollTarget: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.any
  ]),
  debounceDelay: PropTypes.number,
  gutter: PropTypes.number,
  immediate: PropTypes.bool,
  active: PropTypes.bool,
  hasMore: PropTypes.bool,
  shouldLoadMore: PropTypes.func,
  onLoadMore: PropTypes.func.isRequired
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
