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

    test('works out considering parenthesis', () => {
        calculator = new BooleanCalculator()
        expect(calculator.calculate("(TRUE TRUE OR FALSE) AND TRUE")).toBe(true);
        expect(calculator.calculate("(NOT FALSE) OR FALSE")).toBe(true);
        expect(calculator.calculate("(TRUE AND FALSE) AND TRUE")).toBe(false);
        expect(calculator.calculate("NOT (TRUE AND TRUE)")).toBe(false);
        expect(calculator.calculate("NOT (TRUE AND NOT FALSE)")).toBe(false);
        expect(calculator.calculate("(NOT TRUE AND NOT FALSE) AND NOT TRUE")).toBe(false);
        expect(calculator.calculate("(TRUE OR FALSE) AND NOT TRUE")).toBe(false);

    });

    test('get single value', () => {
        calculator = new BooleanCalculator()
        expect(calculator.getSingleValue(true, false)).toBe(true);
        expect(calculator.getSingleValue(true, true)).toBe(false);
        expect(calculator.getSingleValue(false, false)).toBe(false);
        expect(calculator.getSingleValue(false, true)).toBe(true);
    });

    test('getSingleValue', () => {
        calculator = new BooleanCalculator()
        expect(calculator.getSingleValue(true, false)).toBe(true);
        expect(calculator.getSingleValue(true, true)).toBe(false);
        expect(calculator.getSingleValue(false, false)).toBe(false);
        expect(calculator.getSingleValue(false, true)).toBe(true);
    });

    describe('removeSoloBools', () => {
        calculator = new BooleanCalculator()
        const items = [
            [[true, "AND", true], []],
            [["NOT", true], []],
            [[true, "OR", true], []],
            [[true, "OR", true, true], [true]],
            [[true, true, "OR", true], [true]],
            [[true, "AND", true, false], [false]],
            [["NOT", true, true], [true]],
            [['true', 'OR', 'true', "NOT", true, "NOT", true], []],
            [["NOT", true, true, true, "AND", true], [true]],
            [['true', 'OR', 'true', true, "AND", true, "NOT", true], []],
        ];
        test.each(items)(
            "given %p as input array",
            (inputArray, expectedOutput) => {
                const result = calculator.removeSoloBools(inputArray);
                expect(result).toEqual(expectedOutput);
            }
        );
    });

    describe('calculateAndOrValues', () => {
        calculator = new BooleanCalculator()
        const items = [
            [[true, 'OR', true], "OR", true],
            [[true, 'OR', false], "OR", true],
            [[false, 'OR', false], "OR", false],
            [[true, 'OR', false], "AND", undefined],
            [[true, 'OR', true], "AND", undefined],
            [[false, 'OR', false], "AND", undefined],
            [[true, 'AND', true], "OR", undefined],
            [[true, 'AND', false], "OR", undefined],
            [[false, 'AND', false], "OR", undefined],
            [[true, 'AND', false], "AND", false],
            [[true, 'AND', true], "AND", true],
            [[false, 'AND', false], "AND", false],

        ]
        test.each(items)(
            "given %p as input array",
            (inputArray, joiner, expectedOutput) => {
                const result = calculator.calculateAndOrValues(inputArray, joiner);
                expect(result).toEqual(expectedOutput);
            }
        );
    });

    describe('sortArrayIntoCategories', () => {
        calculator = new BooleanCalculator()
        const items = [
            [[true, "AND", true], [true]],
            // [["NOT", true], [false]],
            [[true, "OR", true], [true]],
            [[true, "OR", true, true], [true, true]],
            [[true, true, "OR", true], [true, true]],
            [[true, "AND", true, false], [false, true]],
            [["NOT", true, true], [true, false]],
            [[true, 'OR', true, "NOT", true, "NOT", true], [false, false, true]],
            [["NOT", true, true, true, "AND", true], [true, false, true]],
            [[true, 'OR', true, true, "AND", true, "NOT", true], [false, true, true]],
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
        expect(calculator.countAllIndividualElements( ['NOT', true], 'NOT')).toEqual([false]);
        expect(calculator.countAllIndividualElements(['NOT', true, true], 'NOT')).toEqual([false]);
        expect(calculator.countAllIndividualElements([true, 'AND', true], 'NOT')).toEqual([]);
        expect(calculator.countAllIndividualElements( ['NOT', true, true, 'AND', true], 'NOT')).toEqual([false]);
        expect(calculator.countAllIndividualElements( ['NOT', true, true, "OR", true], 'NOT')).toEqual([false]);

        expect(calculator.countAllIndividualElements([], 'AND')).toEqual([]);
        expect(calculator.countAllIndividualElements( [true, 'AND', true], 'AND')).toEqual([true]);
        expect(calculator.countAllIndividualElements([true, 'AND', true, 'NOT', true], 'AND')).toEqual([true]);
        expect(calculator.countAllIndividualElements( [true, "OR", true, true, 'AND', true], 'AND')).toEqual([true]);

        expect(calculator.countAllIndividualElements(['NOT', true, true, 'OR', true], 'OR')).toEqual([true]);
        expect(calculator.countAllIndividualElements( [true, 'OR', true, true, 'AND', true], 'OR')).toEqual([true]);
        expect(calculator.countAllIndividualElements( ['NOT', true, true, 'AND', true], 'OR')).toEqual([]);
        expect(calculator.countAllIndividualElements( [true, 'OR', true], 'OR')).toEqual([true]);
    });

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
            ["(TRUE OR TRUE OR TRUE) AND FALSE", false],
            ["NOT (TRUE AND TRUE)", false],

        ];
        test.each(items)(
            "given %p as input array",
            (inputArray, expectedOutput) => {
                const result = calculator.calculate(inputArray);
                expect(result).toEqual(expectedOutput);
            }
        );
    });