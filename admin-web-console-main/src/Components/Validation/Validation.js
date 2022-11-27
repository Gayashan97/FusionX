export const username = [
    { required: true, message: 'Please Fill Input Field!' },
    { pattern: new RegExp(/^[a-zA-Z0-9- ,/]*$/i), message: "Field Doesn't Accept Special Characters"}
];
export const emailValidation = [
    { required: true, message: 'Please Fill Input Field!' },
    { pattern: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), message: "Invalid Email Address"}
];
export const requiredField = [
    { required: true, message: 'Please Fill Input Field!' }
];
