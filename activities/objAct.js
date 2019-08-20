function deepEqual (input1, input2) {

  // if input types are different they are not equal
  if (typeof(input1) != typeof(input2)) {
    return false;
  }

  // if inputs are object types
  else if (typeof(input1) == "object" && input1 != null) {

    if (input2 === null)                                      // if 2nd input is null and first is not, not equal
    {
      return false;
    }

    var input1Keys = Object.keys(input1);                     // create array of properties in first input
    var input2Keys = Object.keys(input2);                     // create array of properties in second input

    // first, check to see if properties are the same. only check if values are equal after confirming properties are the same

    var keysInInput1 = input1Keys.length;                     // get number of properties in first input
    var keysInInput2 = input2Keys.length;                     // get number of properties in second input

    // check for same number of properties, if different, return false
    if (keysInInput1 != keysInInput2) {
      return false;
    }

    for (var i = 0; i < keysInInput1; i++) {                  // loop through first input, check if other array contains current property
      var found = input2Keys.includes(input1Keys[i]);
      if (found === false) {                                  // if property not found in other array, objects not equal
        return false;
      }
    }

    for (var i = 0; i < keysInInput2; i++) {                  // loop through second input, check if other array contains current property
      var found = input1Keys.includes(input2Keys[i]);
      if (found === false) {                                  // if property not found in other array, objects not equal
        return false;
      }
    }

    // properties between two objects are the same, now check for equal values

    for (prop1 in input1) {                                         // loop through elements of 1st input
      for (prop2 in input2) {                                       // loop through elements of 1st input

        var sameProp = prop1 == prop2;                              // only want to compare values of identical properties

        if (sameProp) {                                             // properties are the same, now check values
          var sameVal = deepEqual(input1[prop1], input2[prop2]);    // recursively call deepEqual function, passing values as a parameters

          if (sameVal === false) {                                  // values are not equal, so return false
            return false;
          }
        }
      }
    }

    return true;                                                    // all properties values are equal, return true

  }

  // if input types are not objects, compare values directly
  else if (typeof(input1) != "object") {
    if (input1 === input2) {
      return true;                                        // if values are equal return true
    }
    else {
      return false;                                       // if values are not equal return false
    }
  }

  // if inputs are both null, inputs are equal
  else if (input1 === null && input2 === null) {
    return true;
  }

  // checked all scenarios for equality, two inputs must not be equal
  else {
    return false;
  }
}

let obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
