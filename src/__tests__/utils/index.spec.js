import { fireEvent } from '@testing-library/dom';
import { isNull, isObj, isFunc, debounce, uid, scrollSpy } from '../../utils';

describe('Utils', () => {
  it('validates null type', () => {
    const nullVal = null;
    const nonNullVal = 15;

    expect(isNull(nullVal)).toBe(true);
    expect(isNull(nonNullVal)).toBe(false);
  });

  it('validates object type', () => {
    const objVal = {};
    const numVal = 15;
    const funcVal = () => {};
    const nullVal = null;
    const arrVal = [];

    expect(isObj(objVal)).toBe(true);
    expect(isObj(numVal)).toBe(false);
    expect(isObj(funcVal)).toBe(false);
    expect(isObj(nullVal)).toBe(false);
    expect(isObj(arrVal)).toBe(false);
  });

  it('validates function type', () => {
    const funcVal = () => {};
    const nullVal = null;
    const objVal = {};

    expect(isFunc(funcVal)).toBe(true);
    expect(isFunc(nullVal)).toBe(false);
    expect(isFunc(objVal)).toBe(false);
  });

  it('generates uids', () => {
    const length = 1000;
    const uids = [];
    const arr = Array.from({ length });

    arr.forEach(() => {
      const itemUid = uid();

      if (!uids.includes(itemUid)) {
        uids.push(itemUid);
      }
    });

    expect(uids.length).toBe(arr.length);
  });

  it('debounces high frequency event', async () => {
    let counter = 0;
    const debouncer = debounce('debounce-test', 500);

    const event = () => {
      debouncer(() => {
        counter += 1;
      });
    };

    const funcA = () => new Promise(resolve => {
      setTimeout(() => {
        event();
        resolve();
      }, 200);
    });

    const funcB = () => new Promise(resolve => {
      setTimeout(() => {
        event();
        resolve();
      }, 200);
    });

    const funcC = () => new Promise(resolve => {
      setTimeout(() => {
        event();
        resolve();
      }, 200);
    });

    await funcA().then(() => funcB().then(funcC));
    await setTimeout(() => {
      expect(counter).toBe(1);
    }, 1000);
  });

  it('triggers "onScroll" callback when scroll target was scrolled', async () => {
    const itemsLength = 40;
    const scrollTarget = document.createElement('div');
    scrollTarget.style.height = '500px';
    scrollTarget.style.overflow = 'auto';

    const list = document.createElement('ul');
    Array.from({ length: itemsLength }).forEach(() => {
      const listItem = document.createElement('li');
      listItem.style.height = '100px';
      list.appendChild(listItem);
    });

    scrollTarget.appendChild(list);

    let isTriggered = false;
    const handleScroll = () => {
      isTriggered = true;
    };

    scrollSpy().init({
      element: scrollTarget,
      onScroll: handleScroll
    });

    fireEvent.scroll(scrollTarget, {
      scrollTop: 300
    });

    await setTimeout(() => {
      expect(isTriggered).toBe(true);
    }, 500);
  });

  it('does not trigger "onScroll" callback when scrollSpy was destroyed', async () => {
    const itemsLength = 40;
    const scrollTarget = document.createElement('div');
    scrollTarget.style.height = '500px';
    scrollTarget.style.overflow = 'auto';

    const list = document.createElement('ul');
    Array.from({ length: itemsLength }).forEach(() => {
      const listItem = document.createElement('li');
      listItem.style.height = '100px';
      list.appendChild(listItem);
    });

    scrollTarget.appendChild(list);

    let isTriggered = false;
    const handleScroll = () => {
      isTriggered = true;
    };

    const scroller = scrollSpy();
    scroller.init({
      element: scrollTarget,
      onScroll: handleScroll
    });

    scroller.destroy();

    fireEvent.scroll(scrollTarget, {
      scrollTop: 300
    });

    await setTimeout(() => {
      expect(isTriggered).toBe(false);
    }, 500);
  });

  it('determines correct scroll top offset', async () => {
    const itemsLength = 40;
    const scrollTarget = document.createElement('div');
    scrollTarget.style.height = '500px';
    scrollTarget.style.overflow = 'auto';

    const list = document.createElement('ul');
    Array.from({ length: itemsLength }).forEach(() => {
      const listItem = document.createElement('li');
      listItem.style.height = '100px';
      list.appendChild(listItem);
    });

    scrollTarget.appendChild(list);

    let scrollOffset = 0;
    const handleScroll = (scrollYOffset) => {
      scrollOffset = scrollYOffset;
    };

    const scroller = scrollSpy();
    scroller.init({
      element: scrollTarget,
      onScroll: handleScroll
    });

    scroller.destroy();

    // scroll once
    let scrollTop = 300;
    fireEvent.scroll(scrollTarget, {
      scrollTop
    });

    await setTimeout(async () => {
      expect(scrollOffset).toBe(scrollTop);

      // scroll twice
      scrollTop += 200;
      fireEvent.scroll(scrollTarget, {
        scrollTop
      });

      await setTimeout(async () => {
        expect(scrollOffset).toBe(scrollTop);

        // scroll thrice
        scrollTop += 400;
        fireEvent.scroll(scrollTarget, {
          scrollTop
        });

        await setTimeout(() => {
          expect(scrollOffset).toBe(scrollTop);
        }, 500);
      }, 500);
    }, 500);
  });
});
