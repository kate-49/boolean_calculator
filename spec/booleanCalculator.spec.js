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

describe('sortArrayIntoCategories', () => {
    calculator = new BooleanCalculator()
    const items = [
        [["TRUE", "AND", "TRUE"], ["TRUE", "AND", "TRUE", true]],
        [["NOT", "TRUE"], ["NOT", "TRUE", false]],
        [["TRUE", "OR", "TRUE"], ["TRUE", "OR", "TRUE", true]],
        [["TRUE", "OR", "TRUE", "TRUE"], ["TRUE", "OR", "TRUE", "TRUE", true, true]],
        [["TRUE", "TRUE", "OR", "TRUE"], ["TRUE", "TRUE", "OR", "TRUE", true, true]],
        [["TRUE", "AND", "TRUE", "FALSE"], ["TRUE", "AND", "TRUE", "FALSE", false, true]],
        [["NOT", "TRUE", "TRUE"], ["NOT", "TRUE", "TRUE", true, false]],
        [[ 'TRUE', 'OR', 'TRUE', "NOT", "TRUE", "NOT", "TRUE" ],['TRUE', 'OR', 'TRUE', "NOT", "TRUE", "NOT", "TRUE", false, false, true]],
        [["NOT", "TRUE", "TRUE", "TRUE", "AND", "TRUE"], ["NOT", "TRUE", "TRUE", "TRUE", "AND", "TRUE", true, false, true]],
        [[ 'TRUE', 'OR', 'TRUE', "TRUE", "AND", "TRUE", "NOT", "TRUE"], ['TRUE', 'OR', 'TRUE', "TRUE", "AND", "TRUE", "NOT", "TRUE", false, true, true]],
    ];
    test.each(items)(
        "given %p as input array",
        (inputArray, expectedOutput) => {
            const result = calculator.sortArrayIntoCategories(inputArray);
            expect(result).toEqual(expectedOutput);
        }
    );
});


test('findElement', () => {
    calculator = new BooleanCalculator()
    expect(calculator.findElement([], ["NOT", "TRUE"], "NOT")).toEqual( [[false], ["NOT", "TRUE"]]);
    expect(calculator.findElement(["NOT TRUE"], ["NOT", "TRUE"], "NOT")).toEqual([["NOT TRUE", false], ["NOT", "TRUE"]]);
    expect(calculator.findElement([], ["TRUE", "AND", "TRUE"], "NOT")).toEqual([[], ["TRUE", "AND", "TRUE"]]);
    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "AND", "TRUE"], "NOT")).toEqual([[false], ["NOT", "TRUE", "TRUE", "AND", "TRUE"]]);

    expect(calculator.findElement(["NOT TRUE"], [], "AND")).toEqual([["NOT TRUE"], []]);
    expect(calculator.findElement([], ["TRUE", "AND", "TRUE"], "AND")).toEqual( [[true], ["TRUE", "AND", "TRUE"]]);
    expect(calculator.findElement(["NOT TRUE"], ["TRUE", "AND", "TRUE"], "AND")).toEqual([["NOT TRUE", true], ["TRUE", "AND", "TRUE"]]);
    expect(calculator.findElement([], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"], "AND")).toEqual([[true], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"]]);

    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "OR", "TRUE"], "OR")).toEqual([[true], ["NOT", "TRUE", "TRUE", "OR", "TRUE"]]);
    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "OR", "TRUE"], "NOT")).toEqual([[false], ["NOT", "TRUE", "TRUE", "OR", "TRUE"]]);
    expect(calculator.findElement([], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"], "OR")).toEqual([[true], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"]]);
    expect(calculator.findElement(["TRUE AND TRUE"], ["NOT", "TRUE", "TRUE", "AND", "TRUE"], "OR")).toEqual([["TRUE AND TRUE"], ["NOT", "TRUE", "TRUE", "AND", "TRUE"]]);
    expect(calculator.findElement(["TRUE AND TRUE"], ["TRUE", "OR", "TRUE"], "OR")).toEqual([["TRUE AND TRUE", true], ["TRUE", "OR", "TRUE"]]);
})