class BooleanCalculator {
    calculate(inputString) {
        let inputArray = inputString.split(" ");

        let sortedArray = this.sortArrayIntoCategories(inputArray)

        console.log("sorted array")
        console.log(sortedArray)

        return this.getFinalOutcome(sortedArray)

    }

    getFinalOutcome(sortedArray) {
        let numberOfTrue = 0;
        let numberOfFalse = 0;
        sortedArray.forEach((element) => {
            if (element === true) {
                numberOfTrue++;
            } else if(element === false) {
                numberOfFalse++;
            }
        });
        return numberOfTrue > numberOfFalse
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

        for(let i = 0; i < inputArray.length; i++) {
            if ((inputArray[i - 1] !== "AND") && (inputArray[i - 1] !== "OR") && (inputArray[i - 1] !== "NOT")) {
                if ((inputArray[i + 1] !== "AND") && (inputArray[i + 1] !== "OR") && (inputArray[i + 1] !== "NOT")) {
                    if (inputArray[i] === "TRUE" || inputArray[i] === "FALSE") {
                        sortedArray.push(this.getSingleValue(inputArray[i], false));
                    }
                }
            }
        }
        console.log("sorted")
        console.log(sortedArray)
        console.log("input")
        console.log(inputArray)

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

    calculateOutput(elementArray, joiner) {
        if (elementArray.length === 2 && joiner === "NOT") {
            return this.getSingleValue(elementArray[1], true)
        }
        if (elementArray.length === 3 && joiner === "AND") {
            return this.calculateAnd(elementArray)
        }
        if (elementArray.length === 3 && joiner === "OR") {
            return this.calculateOR(elementArray)
        }
    }

    findElement(sortedArray, inputArray, searchText) {
        let numberOfElementInArray = inputArray.filter(x => x===searchText).length

        for(let i = 0; i < numberOfElementInArray; i++) {
            let indexOfElement = inputArray.indexOf(searchText);
             if (searchText === "NOT") {
                 const result = this.calculateOutput([[indexOfElement], inputArray[indexOfElement+1]], searchText)
                 sortedArray.push(result)
             } else {
                 const result = this.calculateOutput([inputArray[indexOfElement-1], inputArray[indexOfElement], inputArray[indexOfElement+1]], searchText)
                 sortedArray.push(result)
             }
        }
        return [sortedArray, inputArray]
    }


}
module.exports = BooleanCalculator;