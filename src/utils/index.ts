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

export interface ScrollSpyOnScrollData {
  scrollYOffset: number
}

export interface ScrollSpyInitConfig {
  element: any,
  immediate?: boolean | false,
  onScroll: (scrollSpyOnScrollData: ScrollSpyOnScrollData) => void
}

/**
 * @description Scroll spy
 */
export const scrollSpy = () => {
  let targetElement = window;
  let didScroll = false;
  let hasElement = false;
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  let handleOnScroll = (scrollSpyOnScrollData: ScrollSpyOnScrollData) => {};

  const getDocumentOffsetY = () => window.pageYOffset || document.documentElement.scrollTop;

  // @ts-ignore
  const getOffsetY = () => (hasElement ? targetElement.scrollTop : getDocumentOffsetY());

  const handleScroll = () => {
    const scrollYOffset = getOffsetY();
    // @ts-ignore
    handleOnScroll({ scrollYOffset });
    didScroll = false;
  };

  const scrollListener = () => {
    if (!didScroll) {
      setTimeout(handleScroll, 50);
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
      return this;
    }
  };
};
