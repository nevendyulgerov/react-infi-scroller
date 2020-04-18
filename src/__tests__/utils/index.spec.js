import { isNull, isObj, isFunc, debounce } from '../../utils';

describe('Utils', () => {
  it('validates null value', () => {
    const nullVal = null;
    const nonNullVal = 15;

    expect(isNull(nullVal)).toBe(true);
    expect(isNull(nonNullVal)).toBe(false);
  });

  it('validates object value', () => {
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

  it('validates function value', () => {
    const funcVal = () => {};
    const nullVal = null;
    const objVal = {};

    expect(isFunc(funcVal)).toBe(true);
    expect(isFunc(nullVal)).toBe(false);
    expect(isFunc(objVal)).toBe(false);
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
});
