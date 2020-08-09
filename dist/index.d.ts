import * as React from 'react';
import { InfiScrollerProps } from './types/components.type';
declare const InfiScroller: {
    (props: InfiScrollerProps): React.ReactNode;
    defaultProps: {
        scrollTarget: null;
        debounceDelay: number;
        gutter: number;
        immediate: boolean;
        active: boolean;
        hasMore: boolean;
        shouldLoadMore: (targetHeight: number, scrollYOffset: number, gutter: number, scrollHeight: number) => boolean;
    };
};
export default InfiScroller;
