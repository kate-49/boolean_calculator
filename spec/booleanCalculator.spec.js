const BooleanCalculator = require('../models/booleanCalculator');

test('returns bools for single values', () => {
    calculator = new BooleanCalculator()
    // expect(calculator.calculate("TRUE")).toBe(true);
    // expect(calculator.calculate("FALSE")).toBe(false);
});
//
// test('returns bools for NOT values', () => {
//     calculator = new BooleanCalculator()
//     expect(calculator.calculate("NOT TRUE")).toBe(false);
//     expect(calculator.calculate("NOT FALSE")).toBe(true);
// });
//
// test('returns bools for AND values', () => {
//     calculator = new BooleanCalculator()
//     expect(calculator.calculate("TRUE AND TRUE")).toBe(true);
//     expect(calculator.calculate("TRUE AND FALSE")).toBe(false);
// });
//
// test('returns bools for OR values', () => {
//     calculator = new BooleanCalculator()
//     expect(calculator.calculate("TRUE OR TRUE")).toBe(true);
//     expect(calculator.calculate("TRUE OR FALSE")).toBe(true);
//     expect(calculator.calculate("FALSE OR FALSE")).toBe(false);
// });
//
// test('works out by priority order', () => {
//     calculator = new BooleanCalculator()
//     expect(calculator.calculate("TRUE OR TRUE OR TRUE AND FALSE")).toBe(true);
//     expect(calculator.calculate("TRUE OR FALSE AND NOT FALSE")).toBe(true);
// });

test('sortArrayIntoCategories', () => {
    calculator = new BooleanCalculator()
    expect(calculator.sortArrayIntoCategories(["TRUE", "AND", "TRUE"])).toEqual( ["TRUE", "AND", "TRUE", true]);
    expect(calculator.sortArrayIntoCategories( ["NOT", "TRUE"])).toEqual( ["NOT", "TRUE", false]);
    expect(calculator.sortArrayIntoCategories(["TRUE", "OR", "TRUE"])).toEqual(["TRUE", "OR", "TRUE", true]);

    expect(calculator.sortArrayIntoCategories(["TRUE", "OR", "TRUE", "TRUE"])).toEqual( ["TRUE", "OR", "TRUE", "TRUE", true, true]);
    expect(calculator.sortArrayIntoCategories(["TRUE", "TRUE", "OR", "TRUE"])).toEqual( ["TRUE", "TRUE", "OR", "TRUE", true, true]);

    expect(calculator.sortArrayIntoCategories(["TRUE", "AND", "TRUE", "FALSE"])).toEqual( ["TRUE", "AND", "TRUE", "FALSE", false, true]);
    expect(calculator.sortArrayIntoCategories( ["NOT", "TRUE", "TRUE"])).toEqual(["NOT", "TRUE", "TRUE", true, false]);


    expect(calculator.sortArrayIntoCategories([ 'TRUE', 'OR', 'TRUE', "NOT", "TRUE", "NOT", "TRUE" ])).toEqual(['TRUE', 'OR', 'TRUE', "NOT", "TRUE", "NOT", "TRUE", false, false, true]);
    expect(calculator.sortArrayIntoCategories( ["NOT", "TRUE", "TRUE", "TRUE", "AND", "TRUE"])).toEqual( ["NOT", "TRUE", "TRUE", "TRUE", "AND", "TRUE", false, true]);
    // expect(calculator.sortArrayIntoCategories([ 'TRUE', 'OR', 'TRUE', "TRUE", "AND", "TRUE", "NOT", "TRUE"])).toEqual(['TRUE', 'OR', 'TRUE', "TRUE", "AND", "TRUE", "NOT", "TRUE", false, true, true]);

})
//
// test('findElement', () => {
//     calculator = new BooleanCalculator()
//     expect(calculator.findElement([], ["NOT", "TRUE"], "NOT")).toEqual([["NOT TRUE"], []]);
//     expect(calculator.findElement(["NOT TRUE"], ["NOT", "TRUE"], "NOT")).toEqual( [["NOT TRUE", "NOT TRUE"], []]);
//     expect(calculator.findElement([], ["TRUE", "AND", "TRUE"], "NOT")).toEqual([[], ["TRUE", "AND", "TRUE"]]);
//
//
//     expect(calculator.findElement(["NOT TRUE"], [], "AND")).toEqual([["NOT TRUE"], []]);
//     expect(calculator.findElement([], ["TRUE", "AND", "TRUE"], "AND")).toEqual( [["TRUE AND TRUE"], []]);
//     expect(calculator.findElement(["NOT TRUE"], ["TRUE", "AND", "TRUE"], "AND")).toEqual([["NOT TRUE", "TRUE AND TRUE"], []]);
//
//     expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "OR", "TRUE"], "OR")).toEqual([["TRUE OR TRUE"], ["NOT", "TRUE"]]);
//     expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "OR", "TRUE"], "NOT")).toEqual( [["NOT TRUE"], ["TRUE", "OR", "TRUE"]]);
//     expect(calculator.findElement([], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"], "OR")).toEqual([["TRUE OR TRUE"], ["TRUE", "AND", "TRUE"]]);
//     expect(calculator.findElement([], ["TRUE", "OR", "TRUE", "TRUE", "AND", "TRUE"], "AND")).toEqual([["TRUE AND TRUE"], ["TRUE", "OR", "TRUE"]]);
//
//     expect(calculator.findElement([], ["NOT", "TRUE", "TRUE", "AND", "TRUE"], "NOT")).toEqual([["NOT TRUE"], ["TRUE", "AND", "TRUE"]]);
//
//     expect(calculator.findElement(["TRUE AND TRUE"], ["NOT", "TRUE", "TRUE", "AND", "TRUE"], "OR")).toEqual([["TRUE AND TRUE"], ["NOT", "TRUE", "TRUE", "AND", "TRUE"]]);
//     expect(calculator.findElement(["TRUE AND TRUE"], ["TRUE", "OR", "TRUE"], "OR")).toEqual( [["TRUE AND TRUE", "TRUE OR TRUE"], []]);
// })