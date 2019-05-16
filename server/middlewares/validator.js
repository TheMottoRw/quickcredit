import Joi from 'joi';
export const validateSignup = (data) => {
const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30).required().error(errors => "FirstName must be string and character between 3 and 30"),
    lastName: Joi.string().alphanum().min(3).max(30).required().error(errors => "LastName must be string and character between 3 and 30"),
    email: Joi.string().email({ minDomainAtoms: 2 }).required().max(256).error(errors => "You must provide valid email"),
    password: Joi.string().trim().regex(/^[a-zA-Z0-9@!%$#,.";':-=())\[\]\/\\]{6,30}$/).required().error(errors => "Invalid password, password length must be between 6-32 "),
    }).with('args',['firstName', 'lastName','email','password']);
 
// Return result.
const result = Joi.validate(data, schema);
return result;
}

export const validateSignin = (data) => {
    const schema = Joi.object().keys({
        password: Joi.string().trim().regex(/^[a-zA-Z0-9@!%$#,.";':-=())\[\]\/\\]{6,30}$/).required().error(errors => "Invalid password, password length must be between 6-32 "),
        email: Joi.string().email({ minDomainAtoms: 2 }).required().max(256).error(errors => "You must provide valid email")
    }).with('args',['email', 'password']);
     
    const result = Joi.validate(data, schema);
    return result;
}

export const validateVerifyUser = (data) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required().max(256).error(errors => "You must provide valid email")
    }).with('args','email');
     
    const result = Joi.validate(data, schema);
   return result;
}

export const validateResetPassword = (data) => {
    const schema = Joi.object().keys({
        newpassword: Joi.string().trim().regex(/^[a-zA-Z0-9@!%$#,.";':-=())\[\]\/\\]{6,30}$/).required().error(errors => "Invalid password, password length must be between 6-32 "),
        email: Joi.string().email({ minDomainAtoms: 2 }).required().max(256).error(errors => "You must provide valid email")
    }).with('args',['newpassword', 'email']);
     
    const result = Joi.validate(data, schema);
    return result;
}

export const validateLoanApply = (data) => {
    const schema = Joi.object().keys({
        amount: Joi.number().min(1).required().error(errors => "Invalid amount, must be a number be and greater than 0"),
        tenor: Joi.number().min(1).max(12).required().error(errors => "Invalid tenor value, tenor must be in range of 1 and 12")
    }).with('args',['amount', 'tenor']);
     
    const result = Joi.validate(data, schema);
    return result;
}

export const validateLoanRepay = (data) => {
    const schema = Joi.object().keys({
        id: Joi.number().min(1).required().error(errors => "Invalid loan id, must be a number be and greater than 0"),
        amount: Joi.number().min(1).required().error(errors => "Invalid amount, must be a number be and greater than 0"),
        }).with('args',['id','amount']);
     
    const result = Joi.validate(data, schema);
    return result;
}

export const validateLoanToggle = (data) => {
    const schema = Joi.object().keys({
        id: Joi.number().min(1).required().error(errors => "Loan id must be a number and greater than 0"),
        status: Joi.string().regex(/^(pending|approved)$/).error(errors => "Status must be pending or approved"),
        }).with('args',['id','status']);
     
    const result = Joi.validate(data, schema);
    return result;
}

export const validateSpecificLoan = (data) => {
    const schema = Joi.object().keys({
        id: Joi.number().min(1).required().error(errors => "Loan id is required and must be a number greater than 0")
    }).with('args','id');
     
    const result = Joi.validate(data, schema);
    return result;
}

export const validateLoanByStatus = (data) => {
    const schema = Joi.object().keys({
        status: Joi.string().regex(/^(pending|approved)$/).error(errors => "Status must be pending or approved"),
        repaid: Joi.string().regex(/^(true|false)$/).error(errors => "Repaid must be true or false"),
    }).with('args',['status', 'repaid']);
     
    const result = Joi.validate(data, schema);
    return result;
}
