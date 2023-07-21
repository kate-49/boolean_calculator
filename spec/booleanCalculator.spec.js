const BooleanCalculator = require('../models/booleanCalculator');

test('returns bools for single values', () => {
    calculator = new BooleanCalculator()
    expect(calculator.calculate("TRUE")).toBe(true);
    expect(calculator.calculate("FALSE")).toBe(false);
});

test('returns bools for NOT values', () => {
    calculator = new BooleanCalculator()
    expect(calculator.calculate("NOT TRUE")).toBe(false);
    expect(calculator.calculate("NOT FALSE")).toBe(true);
});

test('returns bools for AND values', () => {
    calculator = new BooleanCalculator()
    expect(calculator.calculate("TRUE AND TRUE")).toBe(true);
    expect(calculator.calculate("TRUE AND FALSE")).toBe(false);
});

test('returns bools for OR values', () => {
    calculator = new BooleanCalculator()
    expect(calculator.calculate("TRUE OR TRUE")).toBe(true);
    expect(calculator.calculate("TRUE OR FALSE")).toBe(true);
    expect(calculator.calculate("FALSE OR FALSE")).toBe(false);
});

test('works out by priority order', () => {
    calculator = new BooleanCalculator()
    expect(calculator.calculate("TRUE OR TRUE OR TRUE AND FALSE")).toBe(true);
    expect(calculator.calculate("TRUE OR FALSE AND NOT FALSE")).toBe(true);
});

test('get single value', () => {
    calculator = new BooleanCalculator()
    expect(calculator.getSingleValue('TRUE', false)).toBe(true);
    expect(calculator.getSingleValue('TRUE', true)).toBe(false);
    expect(calculator.getSingleValue('FALSE', false)).toBe(false);
    expect(calculator.getSingleValue('FALSE', true)).toBe(true);
});

test('removeSoloBools', () => {
    calculator = new BooleanCalculator()
    expect(calculator.getSingleValue('TRUE', false)).toBe(true);
    expect(calculator.getSingleValue('TRUE', true)).toBe(false);
    expect(calculator.getSingleValue('FALSE', false)).toBe(false);
    expect(calculator.getSingleValue('FALSE', true)).toBe(true);
});

test('calculateOutput', () => {
    calculator = new BooleanCalculator()
    expect(calculator.calculateSingleOutput([ 'NOT', 'FALSE' ], "NOT")).toBe(undefined);
    expect(calculator.calculateSingleOutput([ 'NOT', 'TRUE' ], "NOT")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'OR', 'TRUE' ], "NOT")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'OR', 'FALSE' ], "NOT")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'AND', 'TRUE' ], "NOT")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'AND', 'FALSE' ], "NOT")).toBe(undefined);

    expect(calculator.calculateSingleOutput([ 'NOT', 'FALSE' ], "OR")).toBe(undefined);
    expect(calculator.calculateSingleOutput([ 'NOT', 'TRUE' ], "OR")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'OR', 'TRUE' ], "OR")).toBe(true);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'OR', 'FALSE' ], "OR")).toBe(true);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'AND', 'TRUE' ], "OR")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'AND', 'FALSE' ], "OR")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'FALSE', 'AND', 'FALSE' ], "OR")).toBe(undefined);

    expect(calculator.calculateSingleOutput([ 'NOT', 'FALSE' ], "AND")).toBe(undefined);
    expect(calculator.calculateSingleOutput([ 'NOT', 'TRUE' ], "AND")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'OR', 'TRUE' ], "AND")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'OR', 'FALSE' ], "AND")).toBe(undefined);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'AND', 'TRUE' ], "AND")).toBe(true);
    expect(calculator.calculateSingleOutput( [ 'TRUE', 'AND', 'FALSE' ], "AND")).toBe(false);
});

describe('sortArrayIntoCategories', () => {
    calculator = new BooleanCalculator()
    const items = [
        [["TRUE", "AND", "TRUE"], [true]],
        [["NOT", "TRUE"], [false]],
        [["TRUE", "OR", "TRUE"], [true]],
        [["TRUE", "OR", "TRUE", "TRUE"], [true, true]],
        [["TRUE", "TRUE", "OR", "TRUE"], [true, true]],
        [["TRUE", "AND", "TRUE", "FALSE"], [false, true]],
        [["NOT", "TRUE", "TRUE"], [true, false]],
        [[ 'TRUE', 'OR', 'TRUE', "NOT", "TRUE", "NOT", "TRUE" ],[false, false, true]],
        [["NOT", "TRUE", "TRUE", "TRUE", "AND", "TRUE"], [true, false, true]],
        [[ 'TRUE', 'OR', 'TRUE', "TRUE", "AND", "TRUE", "NOT", "TRUE"], [false, true, true]],
    ];
    test.each(items)(
        "given %p as input array",
        (inputArray, expectedOutput) => {
            const result = calculator.sortArrayIntoCategories(inputArray);
            expect(result).toEqual(expectedOutput);
        }
    );
});

describe('removeSoloBools', () => {
    calculator = new BooleanCalculator()
    const items = [
        [["TRUE", "AND", "TRUE"], []],
        [["NOT", "TRUE"], []],
        [["TRUE", "OR", "TRUE"], []],
        [["TRUE", "OR", "TRUE", "TRUE"], [true]],
        [["TRUE", "TRUE", "OR", "TRUE"], [true]],
        [["TRUE", "AND", "TRUE", "FALSE"], [false]],
        [["NOT", "TRUE", "TRUE"], [true]],
        [['TRUE', 'OR', 'TRUE', "NOT", "TRUE", "NOT", "TRUE" ],[]],
        [["NOT", "TRUE", "TRUE", "TRUE", "AND", "TRUE"], [true]],
        [[ 'TRUE', 'OR', 'TRUE', "TRUE", "AND", "TRUE", "NOT", "TRUE"], []],
    ];
    test.each(items)(
        "given %p as input array",
        (inputArray, expectedOutput) => {
            const result = calculator.removeSoloBools(inputArray);
            expect(result).toEqual(expectedOutput);
        }
    );
});

test('findElement', () => {
    calculator = new BooleanCalculator()
    expect(calculator.findElement([], ["NOT", "TRUE"], "NOT")).toEqual( [false]);
    expect(calculator.findElement([false], ["NOT", "TRUE"], "NOT")).toEqual([false, false]);
    expect(calculator.findElement([], ["TRUE", "AND", "TRUE"], "NOT")).toEqual([]);
    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "AND", "TRUE"], "NOT")).toEqual([false]);

    expect(calculator.findElement([true], [], "AND")).toEqual([true]);
    expect(calculator.findElement([], ["TRUE", "AND", "TRUE"], "AND")).toEqual( [true]);
    expect(calculator.findElement([false, false], ["TRUE", "AND", "TRUE"], "AND")).toEqual([false, false, true]);
    expect(calculator.findElement([], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"], "AND")).toEqual([true]);

    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "OR", "TRUE"], "OR")).toEqual([true]);
    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "OR", "TRUE"], "NOT")).toEqual([false]);
    expect(calculator.findElement([], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"], "OR")).toEqual([true]);
    expect(calculator.findElement([true], ["NOT", "TRUE", "TRUE", "AND", "TRUE"], "OR")).toEqual([true]);
    expect(calculator.findElement([false, true], ["TRUE", "OR", "TRUE"], "OR")).toEqual([false, true, true]);
})

describe('e2e', () => {
    calculator = new BooleanCalculator()
    const items = [
        ["TRUE OR TRUE OR TRUE AND FALSE", true],
        ["TRUE OR FALSE AND NOT FALSE", true],
        ["TRUE OR FALSE", true],
        ["FALSE OR FALSE", false],
        ["TRUE AND FALSE", false],
        ["TRUE AND TRUE", true],
        ["NOT TRUE", false],
        ["TRUE", true],
        ["FALSE", false],
    ];
    test.each(items)(
        "given %p as input array",
        (inputArray, expectedOutput) => {
            const result = calculator.calculate(inputArray);
            expect(result).toEqual(expectedOutput);
        }
    );
});
