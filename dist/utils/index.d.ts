/**
 * @description Is null
 * @param val
 */
export declare const isNull: (val: any) => boolean;
/**
 * @description Is object
 * @param val
 */
export declare const isObj: (val: any) => boolean;
/**
 * @description Is function
 * @param val
 */
export declare const isFunc: (val: any) => boolean;
/**
 * @description Uid
 * @param len
 */
export declare const uid: (len?: number) => string;
/**
 * @description Debounce
 * @param id
 * @param delay
 */
export declare const debounce: (id: string | number, delay: number | undefined) => (callback: () => void) => void;
export interface ScrollSpyInitConfig {
    element: any;
    immediate?: boolean | false;
    onScroll: (scrollYOffset: number) => void;
}
/**
 * @description Scroll spy
 */
export declare const scrollSpy: () => {
    init(initData: ScrollSpyInitConfig): any;
    destroy(): any;
};
