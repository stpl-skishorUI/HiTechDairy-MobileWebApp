import { Injectable } from '@angular/core'
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  alphabetsOnly = '^[a-zA-Z]+$';
  alphabetsWithSpace = '^[a-zA-Z][a-zA-Z ]*$';
  email = '^[a-zA-Z0-9._]+@([a-z0-9.]+[.])+[a-z]{2,5}$';
  mobileNoOnly = '[6-9]\\d{9}';
  valPassword = '^(?=.*[a-z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z0-9\d@$!%*?&#]{6,15}$';
  alphaNumericOnly = '^([ a-zA-Z])[- a-zA-Z0-9]+$';
  combinationAlphaNumericOnly = '^[a-zA-Z0-9]*$';
  landLineNoOnly = '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,5})';
  pinCodeOnly = '^[1-9][0-9]{5}$'
  bankIFSCCodeVal = "^[A-Z]{4}0[A-Z0-9]{6}$";
  onlyNumbers = '^[0-9]*$';
  numericWithDotVal = '[+-]?([0-9]*[.])?[0-9]+';
  panNumberOnly = '^([A-Z]){3}([A-Z]){1}([A-Z]){1}([0-9]){4}([A-Z]){1}?$';
  alphaNumericWithTitleCaseOnly = '^[A-Z0-9]*$';
  latValidation = "^([+-])?(?:90(?:\\.0{1,9})?|((?:|[1-8])[0-9])(?:\\.[0-9]{1,9})?)$";
  longValidation = "^([+-])?(?:180(?:\\.0{1,9})?|((?:|[1-9]|1[0-7])[0-9])(?:\\.[0-9]{1,9})?)$";
  alphabetWithSpaceWithSomeSpecChar = '^[a-zA-Z][a-zA-Z &.(),]*$';
  alphabetsWithSpecChar = `^([a-zA-Z0-9 /(,)&.+-=\n'])*$`;
  singleSpaceBetweenTwoCharacters = '^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$';
  numericWithdecimaluptotwoDigits = '^[0-9][0-9]*[.]?[0-9]{0,2}$';
  numericWithdecimaluptotwoDigitsWithNegativeVlaues = '^[-]*[0-9][0-9]*[.]?[0-9]{0,2}$';
  numericWithdecimaluptothreeDigits = '^[0-9][0-9]*[.]?[0-9]{0,3}$';
  numericWithdecimaluptoOneDigits = '^[0-9][0-9]*[.]?[0-9]{0,1}$';
  numericWithDecimalForGST = '^[0-9]{1,3}(\\.[0-9]{1,2})?%?$';
  singleDashDotNumeric = '^[-]?[0-9][0-9]*[.]?[0-9]{0,2}$';
  allZeroMatch = /^0+$/;
  alphanumWithSpecialChar_regx = '^([a-zA-Z0-9 &.(),-/\'"])';

  constructor() { }

  alphabetsWithSpaces(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z ])', 'g');
    return maskSeperator.test(event.key);
  }

  alphabetsWithSpacesWithSpecChar(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z _@./#&+-])', 'g');
    return maskSeperator.test(event.key);
  }

  noSpacesAtStart(event: any) {
    const maskSeperator = new RegExp('^[ ]+|[ ]+$', 'm');
    return !maskSeperator.test(event.key);
  }

  onlyDigits(event: any) {
    const maskSeperator = new RegExp('^([0-9])', 'g');
    return maskSeperator.test(event.key);
  }

  onlyAlphabets(event: any) {
    if (!this.noSpacesAtStart(event)) {
      return false
    }
    const maskSeperator = new RegExp('^([a-zA-Z])', 'g');
    return maskSeperator.test(event.key);
  }

  noSpaceAllow(event: any) {  // for All Space Not Allow
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }

  noEnterAnyKey(event: any) {
    event.preventDefault();
  }

  noFirstSpaceAllow(event: any) {  // for First Space Not Allow
    if (event.target.selectionStart === 0 && (event.code === 'Space')) {
      event.preventDefault();
    }
  }

  alphaNumericWithSpaces(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z0-9 ])', 'g');
    return maskSeperator.test(event.key);
  }

  alphaNumericWithSpacesWithDashSlash(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z0-9/-])', 'g');
    return maskSeperator.test(event.key);
  }

  emailRegex(event: any) { //Email Validation
    if (!this.noSpacesAtStart(event)) return false; // First Space not Accept
    if (event.currentTarget.value.split('..').length - 1 == 1 && (event.keyCode == 46)) return false;  // double .Dot not accept
    if (event.currentTarget.value.split('@').length - 1 == 1 && (event.keyCode == 64)) return false;  // double @ not accept
    if (event.target.selectionStart === 0 && (event.keyCode == 46)) return false;  // starting .Dot not accept
    if (event.target.selectionStart === 0 && (event.keyCode == 64)) return false;  // starting @ not accept
    let key = parseInt(event.key); if (event.target.selectionStart === 0 && (!isNaN(key))) return false; // starting Number not accept
    const maskSeperator = new RegExp('^([a-zA-Z0-9 .@])', 'g'); // only Accept A-Z & 0-9 & .@
    return maskSeperator.test(event.key);
  }

  alphaNumeric(event: any) {
    const maskSeperator = new RegExp('^([a-zA-Z0-9])', 'g');
    return maskSeperator.test(event.key);
  }

  alphaNumericWithSpacesWithSomeSpecChars(event: any) {
    const maskSeperator = new RegExp(`^([a-zA-Z0-9 /(,)&.'+-=])`, 'g');
    return maskSeperator.test(event.key);
  }

  alphaNumericWithSpacesWithSpecChar(event: any) {
    const maskSeperator = new RegExp(`^([a-zA-Z0-9 _@./#&+-])`, 'g');
    return maskSeperator.test(event.key);
  }

  alphaNumericWithSpacesAndSpecChars(event: any) {
    if (!this.noSpacesAtStart(event)) {
      return false
    }
    const maskSeperator = new RegExp('^([a-zA-Z0-9 /(,)&.+-@#$])', 'g');
    return maskSeperator.test(event.key);
  }

  numericWithSpacesAndSpecChars(event: any) {
    if (!this.noSpacesAtStart(event)) {
      return false
    }
    const maskSeperator = new RegExp('^([0-9 .+()-])', 'g');
    return maskSeperator.test(event.key);
  }

  landLineWithSomeSpecChar(event: any) {
    if (!this.noSpacesAtStart(event)) {
      return false
    }
    const maskSeperator = new RegExp('^([0-9 +()-])', 'g');
    return maskSeperator.test(event.key);
  }

  NumericWithDot(event: any) {
    return this.NumericWithDot_WithNoDoubleDot(event);
    // const maskSeperator = new RegExp('^([0-9.])', 'g');
    // return maskSeperator.test(event.key);
  }

  NumericWithDot_Dash(event: any) {
    return this.NumericWithDotDash_WithNoDoubleDotDash(event)
    // const maskSeperator = new RegExp('^([0-9.-])', 'g');
    // return maskSeperator.test(event.key);
  }

  alphanumWithSpecialChar(event: any) {
    const validator = new RegExp('^([a-zA-Z0-9 &.(),-/\'"])', 'g');
    return validator.test(event.key);
  }

  acceptedOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  NumericWithDot_WithNoDoubleDot(event: any) {
    if (event.currentTarget.value.split('.').length - 1 == 1 && (event.keyCode == 46)) return false;  // double . not accept
    const maskSeperator = new RegExp('^([0-9.])', 'g');
    return maskSeperator.test(event.key);
  }

  // double . &  double - not accept
  NumericWithDotDash_WithNoDoubleDotDash(event: any) {
    if ((event.currentTarget.value.split('.').length - 1 == 1 && (event.keyCode == 46)) || (event.currentTarget.value.split('-').length - 1 == 1 && (event.keyCode == 45))) return false;  // double . not accept
    const maskSeperator = new RegExp('^([0-9.-])', 'g');
    return maskSeperator.test(event.key);
  }

  alphaNumericAndSpecChars(event: any) {
    if (!this.noSpacesAtStart(event)) {
      return false
    }
    const maskSeperator = new RegExp('^([a-zA-Z0-9/(,)&.+-@#$])', 'g');
    return maskSeperator.test(event.key);
  }

  //************** To Convert Dot(.) to Zero(0.)  *************/
  setNumValue(event: any, control: string, f: any) {
    if (event.target.selectionStart == 0 && event.key == '.') {
      return f[control].patchValue(0);
    } else {
      if (event.key == '-') {
        return this.NumericWithDot_Dash(event);
      } else {
        if (f[control].getRawValue() == '-' && event.key == '.') {
          return f[control].patchValue('-' + 0);
        } else {
          return this.NumericWithDot(event);
        }
      }

    }
  }
}

