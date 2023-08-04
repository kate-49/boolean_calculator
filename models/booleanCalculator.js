class BooleanCalculator {
    calculate(inputString) {let hasParenthesis = false
        if(inputString.includes('(')) {
            return this.calculateForParenthesis(inputString);
        }
        let inputArray = inputString.split(" ");
        inputArray = this.mapObjectValues(inputArray)

        let sortedArray = this.sortArrayIntoCategories(inputArray)
        return this.getFinalOutcome(sortedArray)
    }

    mapObjectValues (inputArray = {}) {
        let outputArray = []
        for (var key in inputArray) {
            var val = inputArray[ key ];

            if (val === "FALSE") {
                outputArray[ key ] = false;
            }
            else if (val === "TRUE") {
                outputArray[ key ] = true;
            }
            else if (val !== "") {
                outputArray[ key ] = val;
            }
        }
        return outputArray
    }

    calculateForParenthesis(inputString) {
        let bothInputArrays = this.breakStringIntoSubArrays(inputString);
        let secondArray = []
        let inputArray1 = this.mapObjectValues(bothInputArrays[0].split(" "))
        let sortedArray = this.sortArrayIntoCategories(inputArray1)
        let finalOutcome1 = this.getFinalOutcome(sortedArray)

        secondArray.push(finalOutcome1)
        secondArray.push(this.mapObjectValues(bothInputArrays[1].split(" ")))
        let k = this.sortArrayIntoCategories(secondArray.flat())
        return this.getFinalOutcome(k)

    }

    breakStringIntoSubArrays(inputString){
        const inputStringForParenthesis = inputString.slice([inputString.indexOf("(")+1], [inputString.indexOf(")")])
        const restOfInputString = inputString.replace(inputStringForParenthesis, "");
        return [inputStringForParenthesis, restOfInputString.replace("()", "")]
    }

    evaluateSoloBools(inputArray) {
        let sortedArray = []
        for(let i = 0; i < inputArray.length; i++) {
            if ((inputArray[i - 1] !== "AND") && (inputArray[i - 1] !== "OR") && (inputArray[i - 1] !== "NOT")) {
                if ((inputArray[i + 1] !== "AND") && (inputArray[i + 1] !== "OR") && (inputArray[i + 1] !== "NOT")) {
                    if (inputArray[i] === true || inputArray[i] === false) {
                        sortedArray.push(this.getSingleValue(inputArray[i], false));
                    }
                }
            }
        }
        return sortedArray
    }

    sortArrayIntoCategories(inputArray) {
        let newArray = []

        let returnedElements = this.evaluateSoloBools(inputArray)
        if (returnedElements.length >= 1) {
            newArray.push(returnedElements)
        }

        let searchableElements = ["NOT", "AND", "OR"]
        searchableElements.forEach((element) => {
            returnedElements = this.countAllIndividualElements(inputArray, element)
            if (returnedElements.length >= 1) {
                newArray.push(returnedElements)
            }
        })
        if (inputArray.length === 2) {
            if (inputArray.includes('NOT')) {
                inputArray.forEach((element) => {
                    if ((element !== 'NOT') && (element !== null)) {
                        newArray.push(this.getSingleValue(element, true))
                    }
                })
            }
        }
        return newArray.flat();
    }

    getFinalOutcome(sortedArray) {
        let numberOfTrue = sortedArray.filter(x => x===true).length
        let numberOfFalse = sortedArray.filter(x => x===false).length;
        return numberOfTrue >= numberOfFalse
    }

    getSingleValue(bool, reversed) {
        if (bool === true) {
            return reversed !== true;
        } else if (bool === false) {
            return reversed !== false;
        }
         return null;
    }
    calculateAndOrValues(elementArray, joiner) {
        if (elementArray.includes(joiner)) {
            switch(joiner) {
                case "AND":
                    // check number of unique elements in array
                    if ((new Set(elementArray).size) === 2) {
                        return elementArray.includes(true);
                    }
                    return false;
                case "OR":
                    return elementArray.includes(true);
            }
        }
    }

    countAllIndividualElements(inputArray, searchText) {
        let sortedArray = []
        let numberOfElementInArray = inputArray.filter(x => x===searchText).length

        for(let i = 0; i < numberOfElementInArray; i++) {
            let indexOfElement = inputArray.indexOf(searchText);
             if (searchText === "NOT") {
                 if (inputArray[indexOfElement+1] !== null) {
                     const result = this.getSingleValue(inputArray[indexOfElement+1], true)
                     sortedArray.push(result)
                 }
             } else {
                 const result = this.calculateAndOrValues([inputArray[indexOfElement-1], inputArray[indexOfElement], inputArray[indexOfElement+1]], searchText)
                 sortedArray.push(result)
             }
        }
        return sortedArray
    }


}
module.exports = BooleanCalculator;