import { Injectable } from '@angular/core';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { DatePipe, Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class CommonMethodService {
  tokenFromUI: string = "8080808080808080";
  captchaText!: string;

  constructor(private matSnackBar: MatSnackBar, private datePipe: DatePipe, public location: Location) { }

  snackBar(data: string, status: number) {
    let snackClassArr: any = ['snack-success', 'snack-danger', 'snack-warning'];
    this.matSnackBar.open(data, " ", {
      duration: 3000,
      panelClass: [snackClassArr[status]],
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
    })
  }

  //#region ----------------------------------------------------------- encryption and decrypt fn starts------------------------------------//

  //#endregion  -------------------------------------------------- encryption and decrypt fn ends-------------------------------------------//

  createCaptchaText() {
    let id: any = document.getElementById('captcha');
    id.innerHTML = "";
    let charsArray = "0123456789"; // "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    let lengthOtp = 6;
    let captcha: any = [];
    for (let i = 0; i < lengthOtp; i++) {
      let index = Math.floor(Math.random() * charsArray.length + 0);
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    let canvas = document.createElement("canvas");
    canvas.id = "captcha1";
    canvas.width = 160;
    canvas.height = 36;
    let ctx: any = canvas.getContext("2d");
    ctx.font = "24px Georgia";
    ctx.fillText(captcha.join(""), 26, 26);
    this.captchaText = captcha.join("");
    let appendChild: any = document.getElementById("captcha");
    appendChild.appendChild(canvas);
  }

  generateCaptcha() {
    return this.captchaText;
  }

  //#region  ----------------------------------------------Array methods fn starts -------------------------------------------------------//

  findIndex(array: any, key: any, val: any) { // find index of array object  [{'id:0',:name:'john'}, {'id:1',:name:'deo'}]
    let index = array.findIndex((x: any) => x[key] === val);
    return index
  }

  some(array: any, key: any, val: any) { // return true or false
    let flag = array.some((x: any) => x[key] === val);
    return flag
  }

  indexOf(array: any, val: any) { // find index of array value [1,2,3,4]
    let index = array.indexOf(val);
    return index
  }

  //#endregion ----------------------------------------------Array methods fn ends-------------------------------------------------------//

  transformDateWithTime(dateTime: any) { // 2024-07-19T13:01:46.067Z
    let dateWithTime = this.datePipe.transform(dateTime, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss.ms');
    return dateWithTime + "Z";
  }

  transformDate(dateTime: any) { // YYYY-MM-DD
    let date = this.datePipe.transform(dateTime, 'yyyy-MM-dd');
    return date;
  }

  displayDate(dateTime: any) {
    let date = this.datePipe.transform(dateTime, 'dd-MM-yyyy');
    return date;
  }

  displayDateTime(dateTime: any) {
    let date = this.datePipe.transform(dateTime, 'dd-MM-yyyy hh:mm a');
    return date;
  }

  onTriggerValue(event: any) {//on selection get text val 
    return event.source.triggerValue;
  }

  goBackToLocation() {
    this.location.back();
  }

  isEmpty(val: any) {
    let value: any;
    if (val == "" || val == null || val == "null" || val == undefined || val == "undefined" || val == 'string' || val == 0) {
      value = false;
    } else {
      value = true;
    }
    return value;
  }

  getPathName() {
    let lastIndex = window.location.pathname.lastIndexOf('/')
    let pageName = window.location.pathname.substring(lastIndex);
    return pageName
  }

  maskMobileNumber(mobileNumber: string) {
    // Check if the input is a valid number and of proper length (10 digits for example)
    if (typeof mobileNumber === 'string' && mobileNumber.length === 10) {
      return mobileNumber.slice(0, 2) + '******' + mobileNumber.slice(8);
    } else {
      return '-';
    }
  }

  dataType(data: any) {
    return (typeof (data) == 'number' ? 0 : '-');
  }

}
