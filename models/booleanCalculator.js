class BooleanCalculator {
    calculate(inputString) {
        let inputArray = inputString.split(" ");

        let sortedArray = this.sortArrayIntoCategories(inputArray)
        let splitElement = sortedArray[0].split(" ")

        if (splitElement.length === 2 && splitElement[0] === "NOT") {
            return this.getSingleValue(splitElement[1], true)
        }
        if (splitElement.length === 3 && splitElement[1] === "AND") {
            return this.calculateAnd(splitElement)
        }
        if (splitElement.length === 3 && splitElement[1] === "OR") {
            return this.calculateOR(splitElement)
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
        return inputArray[0] === inputArray[2];
    }

    calculateOR(inputArray) {
        return inputArray.includes("TRUE");
    }

    sortArrayIntoCategories(inputArray) {
          let sortedArray = []

        let element0 = this.findElement(sortedArray, inputArray, "NOT")

        let element = this.findElement(element0[0], element0[1], "AND")

        let element2 = this.findElement(element[0], element[1], "OR")

        inputArray = element2[0]
        sortedArray = element2[1]

        inputArray.forEach((element) => {
            sortedArray.push(element)
        });
        return sortedArray;
    }

    findElement(sortedArray, inputArray, searchText) {
        let numberOfElementInArray = inputArray.filter(x => x===searchText).length

        for(let i = 0; i < numberOfElementInArray; i++) {
            let indexOfElement = inputArray.indexOf(searchText);
             if (searchText === "NOT") {
                 const ElementsToMove = [inputArray[indexOfElement], inputArray[indexOfElement+1]].join(" ")

                 sortedArray.push(ElementsToMove)
             } else {
               const ElementsToMove = [inputArray[indexOfElement-1], inputArray[indexOfElement], inputArray[indexOfElement+1]].join(" ")
                 sortedArray.push(ElementsToMove)
             }

            if (searchText === "NOT") {
                inputArray.splice(indexOfElement, 2)
            } else {
                inputArray.splice(indexOfElement-1, 3)
            }

        }
        return [sortedArray, inputArray]
    }


}
module.exports = BooleanCalculator;