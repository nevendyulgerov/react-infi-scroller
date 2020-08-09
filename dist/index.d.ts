/// <reference types="react" />
export declare type InfiScrollerProps = {
    children: JSX.Element | null;
    scrollTarget?: JSX.Element | null;
    debounceDelay?: number;
    gutter?: number;
    immediate?: boolean;
    active?: boolean;
    hasMore?: boolean;
    shouldLoadMore?: (targetHeight: number, scrollYOffset: number, gutter: number, scrollHeight: number) => boolean;
    onLoadMore: () => void;
};
declare const InfiScroller: {
    (props: InfiScrollerProps): JSX.Element | null;
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
