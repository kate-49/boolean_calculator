class BooleanCalculator {
    calculate(inputString) {
        let inputArray = inputString.split(" ");

        let sortedArray = this.sortArrayIntoCategories(inputArray)
        console.log('sort');
        console.log(sortedArray)

        let splitElement = sortedArray[0].split(" ")

        if (splitElement.length === 2 && splitElement[0] === "NOT") {
            return this.getSingleValue(splitElement[1], true)
        }
        if (splitElement.length === 3 && splitElement[1] === "AND") {
            return this.calculateAnd(splitElement)
        }
        return this.getSingleValue(sortedArray[0], false)

    }

    getSingleValue(inputString, reversed) {
        if (inputString.toLowerCase() === "true") {
            return reversed !== true;
        } else if (inputString.toLowerCase() === "false") {
            return reversed !== false;
        }
        return null;
    }

    calculateAnd(inputArray) {
        console.log('input')
        console.log(inputArray)
        return inputArray[0] === inputArray[2];
    }

    sortArrayIntoCategories(inputArray) {
        let sortedArray = []

        let numberOfNotsInArray = inputArray.filter(x => x==="NOT").length

        for(let i = 0; i < numberOfNotsInArray; i++) {
            let indexOfNot = inputArray.indexOf("NOT");
            var ElementsToMove = [inputArray[indexOfNot], inputArray[indexOfNot+1]].join(" ")
            sortedArray.push(ElementsToMove)
            console.log('elements')
            console.log(ElementsToMove)

            inputArray.splice(inputArray[indexOfNot], 2)
        }

        let numberOfAndsInArray = inputArray.filter(x => x==="AND").length

        for(let i = 0; i < numberOfAndsInArray; i++) {
            let indexOfAnd = inputArray.indexOf("AND");
            var ElementsToMove2 = [inputArray[indexOfAnd-1], inputArray[indexOfAnd], inputArray[indexOfAnd+1]].join(" ")
            sortedArray.push(ElementsToMove2)
            inputArray.splice(inputArray[indexOfAnd-1], 3)
        }

        inputArray.forEach((element) => {
            sortedArray.push(element)
        });
        return sortedArray;
    }


}
module.exports = BooleanCalculator;