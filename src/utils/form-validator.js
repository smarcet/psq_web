import T from "i18n-react";

export class FormValidator {

    constructor(rules){
        this._rules = rules;
        this._results = [];
    }

    validate(data){
        let existentRules = this._rules.filter(rule => data.hasOwnProperty(rule.fieldName));

        this._results = existentRules.map(
            (rule) => {
                let value = data[rule.fieldName];
                return rule.apply(value);
            }
        )

        return this._results;
    }

    isInvalid(fieldName){
        return !this.isValid(fieldName);
    }

    isValid(fieldName){
        if(this._results.length == 0) return true;
        let fieldResults = this._results.filter((res) => res.fieldName == fieldName && !res.isValid);
        if(fieldResults.length == 0) return true;
        return false;
    }

    getValidationErrorMessage(fieldName){
        if(this._results.length == 0) return '';
        let fieldResults = this._results.filter((res) => res.fieldName == fieldName && !res.isValid);
        if(fieldResults.length == 0) return '';
        return fieldResults[0].errorMessage;
    }

    isValidData(data){

        if(this._results.length == 0){
            this.validate(data);
        }

        if(this._results.length == 0) return true;

        let invalidResults = this._results.filter((res) =>!res.isValid);

        return invalidResults.length == 0;
    }
}

class AbstractFormValidatorRule {

    constructor(fieldName, friendlyFieldName = '', customErrorMessage = ''){
        this._fieldName = fieldName;
        this._customErrorMessage = customErrorMessage;
        this._friendlyFieldName = friendlyFieldName.trim() == '' ? this._fieldName : friendlyFieldName;
    }

    apply(value){

    }

    _getErrorMessage(){
        return this._customErrorMessage;
    }

    get fieldName() {
        return this._fieldName;
    }
}

class CustomValidatorRule extends AbstractFormValidatorRule
{
    constructor(fieldName, validatorFunc, friendlyFieldName = '', customErrorMessage = ''){
        super(fieldName, friendlyFieldName, customErrorMessage);
        this.validatorFunc = validatorFunc;
    }

    apply(value){
        return this.validatorFunc(value);
    }
}

export class MandatoryField extends CustomValidatorRule
{

    static get DEFAULT_MESSAGE() {
        return '{field} is mandatory';
    }
    
    _getErrorMessage(){
        let errorMessage = super._getErrorMessage();
        return errorMessage.trim() == '' ? MandatoryField.DEFAULT_MESSAGE : errorMessage;
    }

    constructor(fieldName, friendlyFieldName = '', customErrorMessage = ''){
        super(fieldName, (value) => {
           if(value == null || value.toString().trim() == '' || value == 0 || (Array.isArray(value) && value.length == 0))
               return new FormValidatorResult(this._fieldName, false, T.translate( this._getErrorMessage(), { field: this._friendlyFieldName}))
           return new FormValidatorResult(this._fieldName, true);
        }, friendlyFieldName, customErrorMessage);
    }
}

export class GreaterThanField extends CustomValidatorRule
{

    static get DEFAULT_MESSAGE() {
        return '{field} should be greater than {arg1}';
    }

    _getErrorMessage(){
        let errorMessage = super._getErrorMessage();
        return errorMessage.trim() == '' ? GreaterThanField.DEFAULT_MESSAGE : errorMessage;
    }

    constructor(fieldName, arg1, friendlyFieldName = '', customErrorMessage = ''){
        super(fieldName, (value) => {
            if(parseInt(value) <= parseInt(arg1))
                return new FormValidatorResult(this._fieldName, false, T.translate(this._getErrorMessage(), { field: this._friendlyFieldName, arg1: arg1}))
            return new FormValidatorResult(this._fieldName, true);
        }, friendlyFieldName, customErrorMessage);
    }
}

export class EmailField extends CustomValidatorRule
{

    static get DEFAULT_MESSAGE() {
        return '{field} should a valid email';
    }

    _getErrorMessage(){
        let errorMessage = super._getErrorMessage();
        return errorMessage.trim() == '' ? EmailField.DEFAULT_MESSAGE : errorMessage;
    }

    constructor(fieldName, friendlyFieldName = '', customErrorMessage = ''){
        super(fieldName, (value) => {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let res = value.trim() != '' && re.test(String(value).toLowerCase());
            if(!res)
                return new FormValidatorResult(this._fieldName, false, T.translate(this._getErrorMessage(), { field: this._friendlyFieldName}))
            return new FormValidatorResult(this._fieldName, true);
        }, friendlyFieldName, customErrorMessage);
    }
}

export class EqualToField extends CustomValidatorRule
{

    static get DEFAULT_MESSAGE() {
        return '{field} should a equals to {field2}';
    }

    _getErrorMessage(){
        let errorMessage = super._getErrorMessage();
        return errorMessage.trim() == '' ? EqualToField.DEFAULT_MESSAGE : errorMessage;
    }

    constructor(fieldName, fieldName2, friendlyFieldName = '', friendlyFieldName2 = '', customErrorMessage = ''){
        super(fieldName, (value) => {
            let field2 = document.getElementsByName(fieldName2);
            if(field2.length == 0) throw DOMException;
            let value2 = field2[0].value;
            let res = value.trim() == value2.trim();
            if(!res)
                return new FormValidatorResult(this._fieldName, false, T.translate(this._getErrorMessage(), { field: this._friendlyFieldName, field2: friendlyFieldName2}))
            return new FormValidatorResult(this._fieldName, true);
        }, friendlyFieldName, customErrorMessage);
    }
}

export class MinSizeField extends CustomValidatorRule
{

    static get DEFAULT_MESSAGE() {
        return '{field} have a minimum length of {min_len}';
    }

    _getErrorMessage(){
        let errorMessage = super._getErrorMessage();
        return errorMessage.trim() == '' ? MinSizeField.DEFAULT_MESSAGE : errorMessage;
    }

    constructor(fieldName, minLen, friendlyFieldName = '', customErrorMessage = ''){
        super(fieldName, (value) => {
            let res = value.trim().length >= minLen;
            if(!res)
                return new FormValidatorResult(this._fieldName, false, T.translate(this._getErrorMessage(), { field: this._friendlyFieldName, min_len: minLen}))
            return new FormValidatorResult(this._fieldName, true);
        }, friendlyFieldName, customErrorMessage);
    }
}

export class FormValidatorResult
{
    constructor(fieldName, isValid, errorMessage = ''){
        this._fieldName = fieldName;
        this._isValid = isValid;
        this._errorMessage = errorMessage;
    }

    get fieldName() {
        return this._fieldName;
    }

    get isValid() {
        return this._isValid;
    }

    get errorMessage() {
        return this._errorMessage;
    }
}

