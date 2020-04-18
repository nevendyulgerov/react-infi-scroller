import { isStr, isNull, isArr, isObj, isNum, isFunc, isUndef, isBool, isNonEmptyStr, isNonEmptyArr, toInt, hasProp, hasMethod, getKeys, hasKey, hasKeys, eachKey, eachProp, titlize, parseToType, extractNestedProp, buffer, sequence } from '../../../utils';

jest.useFakeTimers();

describe('Utils', () => {
    it('validates string value', () => {
        const strVal = 'Lorem ipsum dolor sit amet';
        const nonStrVal = 15;

        expect(isStr(strVal)).toBe(true);
        expect(isStr(nonStrVal)).toBe(false);
    });

    it('validates null value', () => {
        const nullVal = null;
        const nonNullVal = 15;

        expect(isNull(nullVal)).toBe(true);
        expect(isNull(nonNullVal)).toBe(false);
    });

    it('validates array value', () => {
        const arrVal = [];
        const nonArrVal = 15;

        expect(isArr(arrVal)).toBe(true);
        expect(isArr(nonArrVal)).toBe(false);
    });

    it('validates object value', () => {
        const objVal = {};
        const nonObjVal = 15;

        expect(isObj(objVal)).toBe(true);
        expect(isObj(nonObjVal)).toBe(false);
    });

    it('validates number value', () => {
        const numVal = 15;
        const nonNumVal = null;

        expect(isNum(numVal)).toBe(true);
        expect(isNum(nonNumVal)).toBe(false);
    });

    it('validates function value', () => {
        const funcVal = () => {};
        const nonFuncVal = null;

        expect(isFunc(funcVal)).toBe(true);
        expect(isFunc(nonFuncVal)).toBe(false);
    });

    it('validates undefined value', () => {
        const undefVal = undefined;
        const nonUndefVal = 15;

        expect(isUndef(undefVal)).toBe(true);
        expect(isUndef(nonUndefVal)).toBe(false);
    });

    it('validates boolean value', () => {
        const boolVal = true;
        const nonBoolVal = 15;

        expect(isBool(boolVal)).toBe(true);
        expect(isBool(nonBoolVal)).toBe(false);
    });

    it('validates non empty string value', () => {
        const emptyStr = '';
        const nonStr = 123;
        const nonEmptyStr = 'Lorem ipsum dolor sit amet';

        expect(isNonEmptyStr(emptyStr)).toBe(false);
        expect(isNonEmptyStr(nonStr)).toBe(false);
        expect(isNonEmptyStr(nonEmptyStr)).toBe(true);
    });

    it('validates non empty array value', () => {
        const emptyArr = [];
        const nonArr = 123;
        const nonEmptyArr = [1, 2, 3];

        expect(isNonEmptyArr(emptyArr)).toBe(false);
        expect(isNonEmptyArr(nonArr)).toBe(false);
        expect(isNonEmptyArr(nonEmptyArr)).toBe(true);
    });

    it('converts value to integer', () => {
        const strNum = '15';
        const doubleNum = 25.55;

        expect(toInt(strNum)).toBe(+strNum);
        expect(toInt(doubleNum)).toBe(Math.floor(doubleNum));
    });

    it('validates object prop', () => {
        const obj = {
            name: 'John Doe',
            age: 34
        };

        expect(hasProp(obj, 'name')).toBe(true);
        expect(hasProp(obj, 'age')).toBe(true);
        expect(hasProp(obj, 'height')).toBe(false);
    });

    it('validates object method', () => {
        const obj = {
            name: 'John Doe',
            age: 34,
            getHeight: () => {}
        };

        expect(hasMethod(obj, 'getHeight')).toBe(true);
        expect(hasMethod(obj, 'age')).toBe(false);
    });

    it('gets object keys', () => {
        const obj = {
            name: 'John Doe',
            age: 34,
            getHeight: () => {}
        };
        const keys = getKeys(obj);

        expect(keys.length).toBe(Object.keys(obj).length);
        expect(keys[0]).toBe(Object.keys(obj)[0]);
    });

    it('gets object key', () => {
        const obj = {
            name: 'John Doe',
            age: 34,
            getHeight: () => {}
        };

        expect(hasKey(obj, 'name')).toBe(true);
        expect(hasKey(obj, 'height')).toBe(false);
    });

    it('validated keys existence', () => {
        const obj = { name: 'John Doe' };
        const emptyObj = {};

        expect(hasKeys(obj)).toBe(true);
        expect(hasKeys(emptyObj)).toBe(false);
    });

    it('iterates object keys', () => {
        const obj = {
            name: 'John Doe',
            age: 34,
            getHeight: () => {}
        };

        const keys = [];
        eachKey(obj, (key) => keys.push(key));

        expect(keys[0]).toBe(Object.keys(obj)[0]);
        expect(keys[2]).toBe(Object.keys(obj)[2]);
    });

    it('iterates object props', () => {
        const obj = {
            name: 'John Doe',
            age: 34,
            getHeight: () => {}
        };

        const props = [];
        eachProp(obj, (prop) => props.push(prop));

        expect(props[0]).toBe(obj[Object.keys(obj)[0]]);
        expect(props[2]).toBe(obj[Object.keys(obj)[2]]);
    });

    it('capitalizes string', () => {
        const strVal = 'john';

        expect(titlize(strVal)).toBe('John');
    });

    it('parses value to type', () => {
        const boolTrueVal = 'true';
        const boolFalseVal = 'false';
        const nullVal = 'null';
        const numVal = '15';
        const strVal = 'john doe';

        expect(parseToType(boolTrueVal)).toBe(true);
        expect(parseToType(boolFalseVal)).toBe(false);
        expect(parseToType(nullVal)).toBe(null);
        expect(parseToType(numVal)).toBe(15);
        expect(parseToType(strVal)).toBe(strVal);
    });

    it('extracts nested object prop', () => {
        const obj = {
            name: 'John Doe',
            age: 34,
            meta: {
                eyes: 'blue',
                height: 190
            }
        };

        expect(extractNestedProp(obj, 'meta.eyes')).toBe(obj.meta.eyes);
        expect(extractNestedProp(obj, 'meta.height')).toBe(obj.meta.height);
    });

    it('runs async functions sequentially', async () => {
        const calledFunctions = [];

        const funcA = async (seq) => {
            await new Promise(resolve => {
                setTimeout(() => {
                    calledFunctions.push('funcA');
                    seq.resolve();
                    resolve();
                }, 300);
            });
        };
        const funcB = async (seq) => {
            await new Promise(resolve => {
                setTimeout(() => {
                    calledFunctions.push('funcB');
                    seq.resolve();
                    resolve();
                }, 500);
            });
        };

        await sequence()
            .chain(funcB)
            .chain(funcA)
            .execute();

        setTimeout(() => {
            expect(calledFunctions[0]).toBe('funcB');
            expect(calledFunctions[1]).toBe('funcA');
        }, 1000);

        jest.runAllTimers();
    });

    it('debounces high frequency event', async () => {
        let counter = 0;
        const bufferer = buffer({
            id: 'debounce-test',
            timeout: 500
        });

        const event = () => {
            bufferer(() => {
                counter += 1;
            });
        };

        const funcA = async (seq) => {
            await new Promise(resolve => {
                setTimeout(() => {
                    event();
                    seq.resolve();
                    resolve();
                }, 200);
            });
        };
        const funcB = async (seq) => {
            await new Promise(resolve => {
                setTimeout(() => {
                    event();
                    seq.resolve();
                    resolve();
                }, 200);
            });
        };
        const funcC = async (seq) => {
            await new Promise(resolve => {
                setTimeout(() => {
                    event();
                    seq.resolve();
                    resolve();
                }, 200);
            });
        };

        await sequence()
            .chain(funcA)
            .chain(funcB)
            .chain(funcC)
            .execute();

        setTimeout(() => {
            expect(counter).toBe(1);
        }, 1000);

        jest.runAllTimers();
    });
});
