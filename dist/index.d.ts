import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ScrollSpyInitConfig } from './utils';
export declare type InfiScrollerProps = {
    children: React.ReactNode | React.ReactNodeArray;
    scrollTarget?: React.ReactNode | Window;
    debounceDelay?: number | 300;
    gutter?: number | 10;
    immediate?: boolean | false;
    active?: boolean | true;
    hasMore?: boolean | false;
    shouldLoadMore: (targetHeight: number, scrollYOffset: number, gutter: number, scrollHeight: number) => boolean;
    onLoadMore: () => void;
};
declare const InfiScroller: {
    (props: InfiScrollerProps): JSX.Element;
    scroller: {
        init(initData: ScrollSpyInitConfig): any;
        destroy(): any;
    };
    debouncer: any;
    propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        scrollTarget: PropTypes.Requireable<any>;
        debounceDelay: PropTypes.Requireable<number>;
        gutter: PropTypes.Requireable<number>;
        immediate: PropTypes.Requireable<boolean>;
        active: PropTypes.Requireable<boolean>;
        hasMore: PropTypes.Requireable<boolean>;
        shouldLoadMore: PropTypes.Requireable<(...args: any[]) => any>;
        onLoadMore: PropTypes.Validator<(...args: any[]) => any>;
    };
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
