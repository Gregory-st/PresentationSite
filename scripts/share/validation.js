export function isValidate(element, minlen, maxlen) {
    return element.value.length > minlen && element.value.length <= maxlen;
}

export function getParent(element, deep){
    if(deep <= 0) return element;
    return getParent(element.parentElement, deep - 1);
}

export function validateData(element, minlen = 0, maxlen = 255, deep = 0) {
    const superElement = getParent(element, deep);
    const valid = isValidate(superElement, minlen, maxlen);

    if(!valid){
        superElement.classList.add('error');
    }
    else {
        superElement.classList.remove('error');
    }

    return valid;
}

export function validateDataElements(elements, minlen = 0, maxlen = 255){
    let valid = true;
    elements.forEach(element => {
        if(valid) {
            valid = validateData(element, minlen, maxlen, 0);
        }
        else {
            validateData(element, minlen, maxlen, 0);
        }
    });
    return valid;
}