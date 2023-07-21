class BooleanCalculator {
    calculate(inputString) {
        let inputArray = inputString.split(" ");
        let sortedArray = this.sortArrayIntoCategories(inputArray)
        return this.getFinalOutcome(sortedArray)
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
        console.log("single value")
        console.log(inputString)
        if (inputString === "TRUE") {
            return reversed !== true;
        } else if (inputString === "FALSE") {
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

    calculateSingleOutput(elementArray, joiner) {
        if (elementArray.includes(joiner)) {
            switch(joiner) {
                case "AND":
                    return this.calculateAnd(elementArray)
                case "OR":
                    return this.calculateOR(elementArray)
            }
        }
    }

    findElement(sortedArray, inputArray, searchText) {
        let numberOfElementInArray = inputArray.filter(x => x===searchText).length

        for(let i = 0; i < numberOfElementInArray; i++) {
            let indexOfElement = inputArray.indexOf(searchText);
             if (searchText === "NOT") {
                 const result = this.getSingleValue(inputArray[indexOfElement+1], true)
                 sortedArray.push(result)
             } else {
                 const result = this.calculateSingleOutput([inputArray[indexOfElement-1], inputArray[indexOfElement], inputArray[indexOfElement+1]], searchText)
                 sortedArray.push(result)
             }
        }
        return [sortedArray, inputArray]
    }


}
module.exports = BooleanCalculator;