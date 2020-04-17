import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type InfiScrollerProps = {
    children: React.ReactNode | React.ReactNodeArray;
    scrollTarget?: React.ReactNode | null;
    debounceDelay?: number;
    gutter?: number;
    immediate?: boolean;
    active?: boolean;
    hasMore?: boolean;
    shouldLoadMore?: (targetHeight: number, scrollYOffset: number, gutter: number, scrollHeight: number) => boolean;
    onLoadMore: () => void;
};
declare const InfiScroller: {
    (props: InfiScrollerProps): JSX.Element;
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
