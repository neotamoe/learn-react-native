const validate = (val, rules, connectedValue) => {
    let isValid = true;
    console.log('rules in validate: ', rules);
    for (let rule in rules) {
        console.log('rule in switch is: ', rule)
        switch(rule) {
            case "isEmail": 
                isValid = isValid && emailValidator(val);
                break;
            case "minLength":
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case "equalTo": 
                console.log(rule);
                console.log('connected value in confirm password: ' + connectedValue);
                isValid = isValid && passwordValidator(val, connectedValue[rule]);
                break;
            default: 
                isValid = true;
        }
    }
    return isValid;
}

const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const passwordValidator = (val, checkValue) => {
    console.log("val: " + val + " checkValue: " + checkValue)
    return val === checkValue;
};

export default validate;