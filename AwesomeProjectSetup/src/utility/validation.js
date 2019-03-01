const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
        switch(rule) {
            case "isEmail": 
                isValid = isValid && emailValidator(val);
                break;
            case "minLength":
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case "equalTo": 
                isValid = isValid && passwordValidator(val, connectedValue[rule]);
                break;
            case "validString": 
                isValid = isValid && validStringValidator(val);
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
    return val === checkValue;
};

const validStringValidator = val => {
    return val.trim() !== "";
}

export default validate;