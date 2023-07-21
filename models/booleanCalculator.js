class BooleanCalculator {
    calculate(inputString) {
        let inputArray = inputString.split(" ");
        let sortedArray = this.sortArrayIntoCategories(inputArray)
        return this.getFinalOutcome(sortedArray)
    }

    removeSoloBools(inputArray) {
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
        return sortedArray
    }

    sortArrayIntoCategories(inputArray) {
        let sortedArray = this.removeSoloBools(inputArray)
        let sortedArrayRound1 = this.countAllIndividualElements(sortedArray, inputArray, "NOT")
        let sortedArrayRound2 = this.countAllIndividualElements(sortedArrayRound1, inputArray, "AND")
        return this.countAllIndividualElements(sortedArrayRound2, inputArray, "OR");
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
        if (inputString === "TRUE") {
            return reversed !== true;
        } else if (inputString === "FALSE") {
            return reversed !== false;
        }
        return null;
    }
    calculateAndOrValues(elementArray, joiner) {
        console.log(elementArray)
        console.log(joiner)
        if (elementArray.includes(joiner)) {
            switch(joiner) {
                case "AND":
                    // check number of unique elements in array
                    if ((new Set(elementArray).size) === 2) {
                        return elementArray.includes("TRUE");
                    }
                    return false;
                case "OR":
                    return elementArray.includes("TRUE");
            }
        }
    }

    countAllIndividualElements(sortedArray, inputArray, searchText) {
        let numberOfElementInArray = inputArray.filter(x => x===searchText).length

        for(let i = 0; i < numberOfElementInArray; i++) {
            let indexOfElement = inputArray.indexOf(searchText);
             if (searchText === "NOT") {
                 const result = this.getSingleValue(inputArray[indexOfElement+1], true)
                 sortedArray.push(result)
             } else {
                 const result = this.calculateAndOrValues([inputArray[indexOfElement-1], inputArray[indexOfElement], inputArray[indexOfElement+1]], searchText)
                 sortedArray.push(result)
             }
        }
        return sortedArray
    }


}
module.exports = BooleanCalculator;