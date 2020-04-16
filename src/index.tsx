import * as React from 'react';
import * as PropTypes from 'prop-types';
import getNodeDimensions from 'get-node-dimensions';
import { uid, debounce, scrollSpy, ScrollSpyInitConfig, ScrollSpyOnScrollData, isObj, isFunc } from './utils';

const { useEffect } = React;

export type InfiScrollerProps = {
  children: React.ReactNode | React.ReactNodeArray,
  scrollTarget?: React.ReactNode | Window,
  debounceDelay?: number | 300,
  gutter?: number | 10,
  immediate?: boolean | false,
  active?: boolean | true,
  hasMore?: boolean | false,
  shouldLoadMore: (targetHeight: number, scrollYOffset: number, gutter: number, scrollHeight: number) => boolean,
  onLoadMore: () => void
}

const InfiScroller = (props: InfiScrollerProps) => {
  const { children, scrollTarget, debounceDelay, gutter, immediate, active, hasMore, shouldLoadMore, onLoadMore } = props;
  const hasScrollTarget = isObj(scrollTarget);

  // @ts-ignore
  useEffect(() => {
    let scroller: any = null;
    let debouncer: any = null;

    if (active) {
      const initConfig: ScrollSpyInitConfig = {
        element: scrollTarget,
        immediate,
        onScroll: ({ scrollYOffset }: ScrollSpyOnScrollData) => {
          debouncer(() => {
            // @ts-ignore
            const targetHeight = hasScrollTarget ? getNodeDimensions(scrollTarget).height : window.innerHeight;
            // @ts-ignore
            const scrollHeight = hasScrollTarget ? scrollTarget.scrollHeight : document.body.clientHeight;
            // @ts-ignore
            const canLoadMore = shouldLoadMore(targetHeight, scrollYOffset, gutter, scrollHeight);

            if (hasMore && canLoadMore) {
              onLoadMore();
            }
          });
        }
      };

      scroller = scrollSpy().init(initConfig);
      debouncer = debounce(uid(), debounceDelay);
    }

    return () => {
      if (isObj(scroller)) {
        scroller.destroy();
        scroller = null;
      }

      if (isFunc(debouncer)) {
        debouncer = null;
      }
    };
  }, [children, active]);

  return (
    <>
      {children}
    </>
  );
};

InfiScroller.scroller = scrollSpy();
// @ts-ignore
InfiScroller.debouncer = null;

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
