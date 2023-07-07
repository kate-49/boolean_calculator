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
    // calculator = new BooleanCalculator()
    // expect(calculator.calculate("NOT TRUE NOT FALSE TRUE AND TRUE")).toEqual(["NOT TRUE", "NOT FALSE"]);
    // expect(calculator.sortArrayIntoCategories(['NOT',  'TRUE', 'NOT',  'FALSE', 'TRUE', 'AND', 'TRUE'])).toEqual(["NOT TRUE", "NOT FALSE", "TRUE AND TRUE"]);

})