class BooleanCalculator {
    constructor() {
        this.timeFunctionCalled = 0;
    }
    calculate(inputString) {let hasParenthesis = false
        if(inputString.includes('(')) {
            this.calculateForParenthesis(inputString)
        }
        let inputArray = inputString.split(" ");
        inputArray = this.mapObjectValues(inputArray)

        let sortedArray = this.sortArrayIntoCategories(inputArray)
        return this.getFinalOutcome(sortedArray)
    }

    mapObjectValues (inputArray = {}) {
        for (var key in inputArray) {
            var val = inputArray[ key ];

            if (val === "FALSE") {
                inputArray[ key ] = false;
            }
            else if (val === "TRUE") {
                inputArray[ key ] = true;
            }
        }
        return inputArray
    }

    calculateForParenthesis(inputString){
        let bothInputArrays = this.breakStringIntoSubArrays(inputString);
        let secondArray = []
        console.log("1")
        let inputArray1 = this.mapObjectValues(bothInputArrays[0].split(" "))
        console.log("2")
        let sortedArray = this.sortArrayIntoCategories(inputArray1)
        console.log("3")
        let finalOutcome1 = this.getFinalOutcome(sortedArray)
        console.log("4")
        secondArray.push(finalOutcome1)
        console.log("5")
        secondArray.push(this.mapObjectValues(bothInputArrays[1].split(" ")))
        console.log("6")
        let k = this.sortArrayIntoCategories(secondArray.flat())
        console.log("7")
        console.log("k")
        console.log(k)
        console.log("function")
        console.log(this.timeFunctionCalled)
        return this.getFinalOutcome(k)
        console.log("8")
    }

    breakStringIntoSubArrays(inputString){
        let indexOfElement = inputString.indexOf("(");
        let indexOfElement2 = inputString.indexOf(")");
        let inputStringForParenthesis = inputString.slice([indexOfElement+1], [indexOfElement2])
        let restOfInputString = inputString.replace(inputStringForParenthesis, "");
        return [inputStringForParenthesis, restOfInputString.replace("() ", "")]
    }

    removeSoloBools(inputArray) {
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

        let sortedArray = this.removeSoloBools(inputArray)
        let sortedArrayRound1 = this.countAllIndividualElements(sortedArray, inputArray, "NOT")
        let sortedArrayRound2 = this.countAllIndividualElements(sortedArrayRound1, inputArray, "AND")
        return this.countAllIndividualElements(sortedArrayRound2, inputArray, "OR");
    }

    getFinalOutcome(sortedArray) {
        console.log('final outcome input')
        console.log(sortedArray)
        this.timeFunctionCalled++
        let numberOfTrue = 0;
        let numberOfFalse = 0;
        sortedArray.forEach((element) => {
            console.log("element")
            console.log(element)
            if (element === true) {
                numberOfTrue++;
            } else if(element === false) {
                numberOfFalse++;
            }
        });
        console.log('final outcome output')
        console.log(numberOfTrue >= numberOfFalse)
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