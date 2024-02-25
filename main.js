// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:


// **Validate Credit Card Function** //

function validateCred(array){

    //Use a multiplier to iterate on the elements of the array.
    
    let multiplier = 1;
    // Array with the result of the product defined in the Luhn algorithm

    let arrayProduct = []
    // iterate from right to left and within the iteration we change the multiplier to follow the luhn algorithm pattern

    for( let i = array.length - 1; i >= 0; i--){
        arrayProduct.push(array[i] * multiplier);
        multiplier = multiplier === 2 ? 1 : 2;
    }
    // Just to have an organize reference the array is reverse
    arrayProduct=arrayProduct.reverse()


    // In the arrayProduct we substract 9 from the numbers with more than 2 digits (>9). Use the helper function modDigits

    for(let i = 0; i < arrayProduct.length; i++){
        if(arrayProduct[i] > 9){
            arrayProduct[i] = modDigits(arrayProduct[i]);
        }
    }
    
    // Add up the arrayPorduct using the helper function sumArray and then apply the modulo 10 to check if the card is valid (return true) or not (return false).
     
    //console.log(sumArray(arrayProduct));
    if(sumArray(arrayProduct) % 10 === 0 ){
        return true;
    } else {
        return false;
    }
};

// ** HELPER FUNCTIONS ** //

// Add the two digits of a two digit number.

function modDigits(number){
    return number - 9;
}

// Add the elements of the array

function sumArray(array){
    let total = 0;
    for(let i = 0; i < array.length; i++){
        total = array[i] + total;
    }
    return total;
}

//** Return an array of the invalid Credit Cards **//

// Create a funciton to validate an array of credit card numbers and return an array with the ones that are invalid

function findInvalidCards(arr){
    let arrayInvalidCards=[]
    for ( let i = 0; i < arr.length; i++){
        if(!validateCred(arr[i])){
            arrayInvalidCards.push(arr[i]);
        }
    }
    return arrayInvalidCards
}



// Function to return an array of the companies that have issued invalid cards.
function idInvalidCardCompanies(arr){
    let arrayFirstDigit = findInvalidCards(arr);
        for(let i = 0; i <arrayFirstDigit.length; i++){
            arrayFirstDigit[i] = arrayFirstDigit[i][0]; 
    }
    return companyName(arrayFirstDigit);
    
}

// Helper Function

function companyName(arr){
    let amex = 0;
    let visa = 0;
    let mastercard = 0;
    let discover = 0;
    let notFound = 0;
    let arrayCompanies = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 3){
            amex = amex + 1; 
        } else if (arr[i] === 4){
            visa = visa + 1; 
        }else if (arr[i] === 5){
            mastercard = mastercard + 1; 
        }else if (arr[i] === 6){
            discover = discover + 1; 
        } else{
            notFound = notFound +1;
        }
    }
    if(amex > 0){arrayCompanies.push('Amex (American Express)')};
    if(visa > 0){arrayCompanies.push('Visa')};
    if(mastercard > 0){arrayCompanies.push('Mastercard')};
    if(discover > 0){arrayCompanies.push('Discover')};
    if(notFound > 0){arrayCompanies.push('Company not found')};
    return arrayCompanies;
}


console.log(validateCred(valid1));
console.log(idInvalidCardCompanies(batch));







