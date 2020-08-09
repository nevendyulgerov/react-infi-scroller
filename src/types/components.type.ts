import * as React from 'react';

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
