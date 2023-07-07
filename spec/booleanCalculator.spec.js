const BooleanCalculator = require('../models/booleanCalculator');

test('returns bools for single values', () => {
    calculator = new BooleanCalculator()
    expect(calculator.calculate("TRUE")).toBe(true);
    expect(calculator.calculate("FALSE")).toBe(false);
    expect(calculator.calculate("TEST")).toBe(null);
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

test('sortArrayIntoCategories', () => {
    calculator = new BooleanCalculator()
    expect(calculator.sortArrayIntoCategories(["TRUE", "AND", "TRUE"])).toEqual(["TRUE AND TRUE"]);
    expect(calculator.sortArrayIntoCategories( ["NOT", "TRUE"])).toEqual( ["NOT TRUE"]);
    expect(calculator.sortArrayIntoCategories(["TRUE", "OR", "TRUE"])).toEqual(["TRUE OR TRUE"]);

    expect(calculator.sortArrayIntoCategories([ 'TRUE', 'OR', 'TRUE', "NOT", "TRUE", "NOT", "TRUE" ])).toEqual(["NOT TRUE", "NOT TRUE", "TRUE OR TRUE"]);
    expect(calculator.sortArrayIntoCategories( ["NOT", "TRUE", "TRUE", "TRUE", "AND", "TRUE"])).toEqual( ["TRUE", "NOT TRUE", "TRUE AND TRUE"]);
    expect(calculator.sortArrayIntoCategories([ 'TRUE', 'OR', 'TRUE', "TRUE", "AND", "TRUE", "NOT", "TRUE"])).toEqual(["NOT TRUE", "TRUE AND TRUE", "TRUE OR TRUE"]);

})

test('findElement', () => {
    calculator = new BooleanCalculator()
    expect(calculator.findElement([], ["NOT", "TRUE"], "NOT")).toEqual([["NOT TRUE"], []]);
    expect(calculator.findElement(["NOT TRUE"], ["NOT", "TRUE"], "NOT")).toEqual( [["NOT TRUE", "NOT TRUE"], []]);
    expect(calculator.findElement([], ["TRUE", "AND", "TRUE"], "NOT")).toEqual([[], ["TRUE", "AND", "TRUE"]]);


    expect(calculator.findElement(["NOT TRUE"], [], "AND")).toEqual([["NOT TRUE"], []]);
    expect(calculator.findElement([], ["TRUE", "AND", "TRUE"], "AND")).toEqual( [["TRUE AND TRUE"], []]);
    expect(calculator.findElement(["NOT TRUE"], ["TRUE", "AND", "TRUE"], "AND")).toEqual([["NOT TRUE", "TRUE AND TRUE"], []]);

    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "OR", "TRUE"], "OR")).toEqual([["TRUE OR TRUE"], ["NOT", "TRUE"]]);
    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "OR", "TRUE"], "NOT")).toEqual( [["NOT TRUE"], ["TRUE", "OR", "TRUE"]]);
    expect(calculator.findElement([], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"], "OR")).toEqual([["TRUE OR TRUE"], ["TRUE", "AND", "TRUE"]]);
    expect(calculator.findElement([], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"], "AND")).toEqual([["TRUE AND TRUE"], ["TRUE", "OR", "TRUE"]]);

    expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "AND", "TRUE"], "NOT")).toEqual([["NOT TRUE"], ["TRUE", "AND", "TRUE"]]);

    expect(calculator.findElement(["TRUE AND TRUE"], ["NOT", "TRUE", "TRUE", "AND", "TRUE"], "OR")).toEqual([["TRUE AND TRUE"], ["NOT", "TRUE", "TRUE", "AND", "TRUE"]]);
    expect(calculator.findElement(["TRUE AND TRUE"], ["TRUE", "OR", "TRUE"], "OR")).toEqual( [["TRUE AND TRUE", "TRUE OR TRUE"], []]);
})