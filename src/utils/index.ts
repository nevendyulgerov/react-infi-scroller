/**
 * @description Is null
 * @param val
 */
export const isNull = (val: any): boolean => val === null;

/**
 * @description Is object
 * @param val
 */
export const isObj = (val: any): boolean => typeof val === 'object' && !isNull(val) && !Array.isArray(val);

/**
 * @description Is function
 * @param val
 */
export const isFunc = (val: any): boolean => typeof val === 'function';

/**
 * @description Uid
 * @param len
 */
export const uid = (len: number = 7) => Math.random().toString(35).substr(2, len);

/**
 * @description Debounce
 * @param id
 * @param delay
 */
export const debounce = (id: number | string, delay: number | 300 | undefined): (callback: () => void) => void => {
  const timers = {};

  return (callback) => {
    if (timers[id]) {
      clearTimeout(timers[id]);
    }

    timers[id] = setTimeout(callback, delay);
  };
};

export interface ScrollSpyInitConfig {
  element: any,
  immediate?: boolean | false,
  onScroll: (scrollYOffset: number) => void
}


/**
 * @description Scroll spy
 */
export const scrollSpy = () => {
  let targetElement = window;
  let didScroll = false;
  let hasElement = false;
  const onScrollDelay = 50;
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  const defaultOnScroll = (scrollYOffset: number) => {};
  let handleOnScroll = defaultOnScroll;

  const getDocumentOffsetY = () => window.pageYOffset || document.documentElement.scrollTop;

  const getOffsetY = () => (hasElement
    // @ts-ignore
    ? targetElement.scrollTop
    : getDocumentOffsetY());

  const handleScroll = () => {
    const scrollYOffset = getOffsetY();
    handleOnScroll(scrollYOffset);
    didScroll = false;
  };

  const scrollListener = () => {
    if (!didScroll) {
      setTimeout(handleScroll, onScrollDelay);
      didScroll = true;
    }
  };

  const attachListener = () => {
    targetElement.addEventListener('scroll', scrollListener);
  };

  const detachListener = () => {
    targetElement.removeEventListener('scroll', scrollListener);
  };

  return {
    init(initData: ScrollSpyInitConfig) {
      const { element, immediate = false, onScroll } = initData;
      handleOnScroll = onScroll;
      hasElement = isObj(element);

      if (hasElement) {
        targetElement = element;
      }

      if (immediate) {
        handleScroll();
      }

      attachListener();
      return this;
    },
    destroy() {
      detachListener();
      handleOnScroll = defaultOnScroll;
      return this;
    }
  };
};
