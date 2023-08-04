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
        for (var key in inputArray) {
            var val = inputArray[ key ];

            if (val === "FALSE") {
                inputArray[ key ] = false;
            }
            else if (val === "TRUE") {
                inputArray[ key ] = true;
            }
            else if (val === "") {
                inputArray[ key ] = null;
            }
        }
        return inputArray
    }

    calculateForParenthesis(inputString) {
        let bothInputArrays = this.breakStringIntoSubArrays(inputString);
        let secondArray = []
        console.log('input array 1')
        console.log(this.mapObjectValues(bothInputArrays[0].split(" ")))
        let inputArray1 = this.mapObjectValues(bothInputArrays[0].split(" "))
        let sortedArray = this.sortArrayIntoCategories(inputArray1)
        let finalOutcome1 = this.getFinalOutcome(sortedArray)

        secondArray.push(finalOutcome1)
        secondArray = secondArray.filter(function(item) {
            return item !== null
        })
        secondArray.push(this.mapObjectValues(bothInputArrays[1].split(" ")))
        console.log('secondArray')
        console.log(secondArray.flat())
        let k = this.sortArrayIntoCategories(secondArray.flat())
        console.log('k')
        console.log(k)
        // k.forEach((element) => {
        //     console.log('k in element')
        //     console.log(k)
        //     if (element !== 'NOT' && element !== null) {
        //         console.log('time to return')
        //         return this.getSingleValue(element, true)
        //     }
        // })

        return this.getFinalOutcome(k)

    }

    breakStringIntoSubArrays(inputString){
        let a = []
        const inputStringForParenthesis = inputString.slice([inputString.indexOf("(")+1], [inputString.indexOf(")")])
        console.log('1')
        console.log(inputStringForParenthesis)
        let restOfInputString = inputString.replace(inputStringForParenthesis, "");
        console.log('2')
        console.log(restOfInputString)

        let restOfInputStringW = restOfInputString.replace(" ()", "");
        restOfInputStringW = restOfInputStringW.replace("()", "");
        console.log("3")
        console.log(restOfInputStringW)
        console.log("inputStringForParenthesis")
        console.log(inputStringForParenthesis)
        a.push(inputStringForParenthesis)
        a.push(restOfInputStringW)
        console.log(a)
        return [inputStringForParenthesis, restOfInputStringW]
    }

    removeSoloBools(inputArray) {
        let sortedArray = []
        console.log('in solo bools')
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
        if (inputArray.length === 2) {
            if (inputArray.includes('NOT')) {
                inputArray.forEach((element) => {
                    if ((element !== 'NOT') && (element !== null)) {
                        newArray.push(this.getSingleValue(element, true))
                    }
                })
            }
        }

        let returnedElements = this.removeSoloBools(inputArray)
        if (returnedElements.length >= 1) {
            newArray.push(returnedElements)
        }
        returnedElements = this.countAllIndividualElements(inputArray, "NOT")
        if (returnedElements.length >= 1) {
            newArray.push(returnedElements)
        }
        returnedElements = this.countAllIndividualElements(inputArray, "AND")
        if (returnedElements.length >= 1) {
            newArray.push(returnedElements)
        }
        returnedElements = this.countAllIndividualElements(inputArray, "OR")
        if (returnedElements.length >= 1) {
            newArray.push(returnedElements)
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