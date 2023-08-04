class BooleanCalculator {
    calculate(inputString) {
        // its not converting to a bool its converting to a 'false'
        // if(inputString.includes('(')) {
        //     return this.calculateForParenthesis(inputString)
        // }
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
        // can i sub out all true to be true?
        console.log(bothInputArrays)
        console.log(bothInputArrays[0])

        let sortedArray = this.sortArrayIntoCategories(bothInputArrays[0].split(" "))
        console.log(sortedArray)
        // sortedArray.push(this.sortArrayIntoCategories(bothInputArrays[1].split(" ")))
        console.log("after push")
        console.log(sortedArray)
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
        console.log('solo bools')
        console.log(sortedArray)
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