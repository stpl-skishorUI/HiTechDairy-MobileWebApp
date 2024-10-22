import { DOCUMENT, DatePipe } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AESEncryptDecryptService } from './aesencrypt-decrypt.service';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  codecareerPage!: string;
  filteredArray!: Observable<any[]>;
  currentDate = new Date();
  printHeaderDataForReportObj:any;
  printPageName:any;
  constructor(
    private snackBar: MatSnackBar, 
    private router: Router,
    private _encDec:AESEncryptDecryptService ,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document
  ) { }

  /************************* Creating Captcha - Start Here **********************/
  createCaptchaCarrerPage() {
    //clear the contents of captcha div first
    let id: any = document.getElementById('captcha');
    id.innerHTML = "";
    var charsArray = "0123456789";  //0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 0); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha1";
    canv.width = 120;
    canv.height = 30;
    var ctx: any = canv.getContext("2d");
    ctx.font = "24px Bookman Old Style";
    ctx.fillStyle = "#000000";
    ctx.fillText(captcha.join(""), 10, 26);
    this.codecareerPage = captcha.join("");
    let appendChild: any = document.getElementById("captcha");
    appendChild.appendChild(canv); // adds the canvas to the body element
  }

  checkvalidateCaptcha() {
    return this.codecareerPage;
  }
  /************************* Creating Captcha - End Here **********************/

  /************************* MatSnackbar - Start Here **********************/
  matSnackBar(data: string, status: number, isTranslate?: any) {
    let snackClassArr: any = ['snack-success', 'snack-danger', 'snack-warning'];
    this.snackBar.open(data, "close", {
      duration: 2000,
      panelClass: [snackClassArr[status]],
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'

    })
  }
  /************************* MatSnackbar - End Here **********************/

  /************************* Check Data Type - Start Here **********************/
  checkDataType(val: any) {
    let value: any;
    if (val == "" || val == null || val == "null" || val == undefined || val == "undefined" || val == 'string' || val == 0) {
      value = false;
    } else {
      value = true;
    }
    return value;
  }
  /************************* MatSnackbar - End Here **********************/

  /****************************** Redirecting to New Routing - Start Here *********************/
  routerLinkRedirect(path: any, pageNumber?:any, passingString?:any, updateFlag?:any ) {
    if(passingString){
      let digest = this._encDec.encrypt(`${passingString}`);
      let updateflag = updateFlag? this._encDec.encrypt(updateFlag) :'';
      this.router.navigate([path], {
        queryParams: {
          id: digest,
          ...(pageNumber!='' ? {  page: pageNumber, } : {}),
          ...(updateflag ? {  updateFlag: updateflag, } : {}),
        },
      });
    }else{
      this.router.navigate([path]); 
    }
  }
  /****************************** Redirecting to New Routing - End Here *********************/

  /****************************** Decripting encripted Router URL QueryParams Details - Start Here *********************/
  decriptRouterURLQueryParams(activatedRoutequeryParams:any){
    let digest:any;
    let flag:any;
    let page:any
    activatedRoutequeryParams.subscribe((queryParams: any) => {
      const data = Object.assign({}, queryParams) as any;
      digest = data.id;
      flag = data.updateFlag;
      page=data.page
    });
    const obj={
      id: this._encDec.decrypt(`${decodeURIComponent(digest)}`),
      updateFlag: this._encDec.decrypt(`${decodeURIComponent(flag)}`),
      page:page
    }
    return obj;
  }

  /****************************** Decripting encripted Router URL QueryParams Details - End Here *********************/

  /****************************** Set Date Format In ISO Format - Start Here *********************/
  setDate(date: any) {
    if (date) {
      let d = new Date(date);
      d.setHours(d.getHours() + 5);
      d.setMinutes(d.getMinutes() + 30);
      return d.toISOString();
    }
    else {
      return "";
    }
  }
  /****************************** Set Date Format In ISO Format - End Here *********************/

  /****************************** Date Format with Date Pipe(dd-MM-yyyy) - Start Here *********************/
  dateFormat(date: any, format: any) {
    var formatedDate: any;
    if(format == 'date'){
      formatedDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    }else if(format == 'year'){
      formatedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    }else if(format == 'month'){
      formatedDate = this.datePipe.transform(date, 'MM-dd-yyyy');
    }else if(format == 'dateWithTime'){
      formatedDate = this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
    }else if(format == 'dateWithHrsMin'){
      formatedDate = this.datePipe.transform(date, 'dd/MM/yy hh:mm a');
    }else if(format == 'dateWithslash'){
      formatedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    }else if(format == 'dateWithHrsMinWithFullYear'){
      formatedDate = this.datePipe.transform(date, 'dd/MM/yyyy hh:mm a');
    }else if(format == 'dot'){
      formatedDate = this.datePipe.transform(date, 'dd-MM-yyyy')?.split('-').join('.');
    }else if(format == 'dateWithMonthChar'){
      formatedDate = this.datePipe.transform(date, 'dd-MMM-yyyy');
    }
    return formatedDate;    
  }

  convertDateString(date:any){
    return date?.split("/").reverse().join("-");
  }
  /****************************** Date Format with Date Pipe(dd-MM-yyyy) - End Here *********************/

  /****************************** Set Digits After Decimal - Start Here *********************/
  setTwoDigitsAfterDecimal(value: any) {
    return value? (typeof(value)=='string' ? (Number(value).toFixed(2) ): value.toFixed(2) ): (value == 0 ? value.toFixed(2) : value);
  }
  setSingleDigitsAfterDecimal(value: any) {
    return  value? (typeof(value)=='string' ? (Number(value).toFixed(1) ): value.toFixed(1) ): (value == 0 ? value.toFixed(2) : value);
  }
  /****************************** Set Digits After Decimal - End Here *********************/

  setDigitsAfterDecimal(value: any, fixWith: any) {
    return value? (typeof(value)=='string' ? (Number(value).toFixed(fixWith) ): value.toFixed(fixWith) ): (value == 0 ? value.toFixed(fixWith) : value);
  }

  // find Date toDay date to 18 year old Date
  isOver18() {
    let year = new Date().getFullYear() - 18;
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    let fullDate = month + '-' + date + '-' + year;
    let asd = this.setDate(new Date(fullDate));
    return asd;
  }

  /****************************** Get Financial Year Start Date  - Stat Here *********************/
  getFirstDateOfFinancialYear() {
    const year = new Date().getFullYear();
    const date = new Date('April 1 ' + year);
    return this.currentDate < date ? new Date('April 1 ' + (year - 1)) : date;
  }
  /****************************** Get Financial Year Start Date  - End Here *********************/

  /****************************** Get First/Last Month Date From Current Date - Start Here *********************/
  firstLastMonthDateFromCurrentDate(date: any) {
    var y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    let get21Date = new Date(y + '-' + (m + 1) + '-21'); // get selected Month 21 date
    let firstLastDayObj = { 'firstDay': firstDay, 'lastDay': lastDay, 'get21Date': get21Date };
    return firstLastDayObj;
  }
  /****************************** Get First/Last Month Date From Current Date - End Here *********************/

  /****************************** Get First/Last Month Date From Month/Year - Start Here *********************/
  firstLastMonthDateFromMonthYear(y: any, m: any) {
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    let firstLastDayObj = { 'firstDay': firstDay, 'lastDay': lastDay };
    return firstLastDayObj;
  }
  /****************************** Get First/Last Month Date From Current Date - End Here *********************/

  /****************************** Get Date With 10 Days Diff. Depends on Selected Month - Stat Here *********************/
  getDateWith10DaysDiffDependsOnSelectedMonth(date: any, flag: any){
    var y = date.getFullYear(), m = date.getMonth();
    var lastDay = new Date(y, m + 1, 0); // get selected Month last date
    let get21Date = new Date(y + '-' + (m + 1) + '-21'); // get selected Month 21 date
    let changedDate: any;
    if(flag == 'fromDate'){
      changedDate = new Date(date.getTime() + (+9 * 24 * 60 * 60 * 1000));   // add 10 date in selected date
    }else{
      if(date.getDate() == lastDay.getDate()){
        changedDate = get21Date;    // if month last day is selected then display 21 date of month
      }else{
        changedDate = new Date(date.getTime() - (+9 * 24 * 60 * 60 * 1000));   // substract 10 date from selected date
      }
    }
    lastDay = lastDay.getTime() > this.currentDate.getTime() ? this.currentDate : lastDay;
    changedDate = changedDate.getTime() > this.currentDate.getTime() ? this.currentDate : changedDate;
    return (date.getDate() == 21 && flag == 'fromDate') ? lastDay : changedDate;
  }
  getDateWithDaysDiff(date: any, flag: any){
    var y = date.getFullYear(), m = date.getMonth();
    var lastDay = new Date(y, m + 1, 0); // get selected Month last date
    let get21Date = new Date(y + '-' + (m + 1) + '-21'); // get selected Month 21 date
    let changedDate: any;
    if(flag == 'fromDate'){
      changedDate = new Date(date.getTime() + (+9 * 24 * 60 * 60 * 1000));   // add 10 date in selected date
    }else{
      if(date.getDate() == lastDay.getDate()){
        changedDate = get21Date;    // if month last day is selected then display 21 date of month
      }else{
        changedDate = new Date(date.getTime() - (+9 * 24 * 60 * 60 * 1000));   // substract 10 date from selected date
      }
    }
    lastDay = lastDay.getTime() > this.currentDate.getTime() ? this.currentDate : lastDay;
    changedDate = changedDate.getTime() > this.currentDate.getTime() ? this.currentDate : changedDate;
    const obj={
      fromDate: flag =='fromDate' ? date : changedDate ,
      toDate: flag =='fromDate' ? (date.getDate() == 21 ? lastDay : changedDate ) : date 
    }
    return obj
  }
  /****************************** Get Date With 10 Days Diff. Depends on Selected Month - End Here *********************/

  //.......................... filter ngx-mat-select-search dropdown common code Start Here...........................//
  filterArrayDataZone(array: any, formControl: any, keyName: any, subjectName: any) {
    if (!array) { return; }
    let search = formControl.value;
    if (!search) {
      subjectName.next(array.slice());
      return;
    } else { search = search.toLowerCase(); }

    subjectName.next(array.filter( // filter the array data
      (ele: any) => ele[keyName]?.toLowerCase().indexOf(search) > -1));
  }
  //.......................... filter ngx-mat-select-search dropdown common code End Here...........................//

  /****************************** Show/Hide Table Header dynamically - Start Here *********************/
  setTableKeys(displayedHeaders: any, displayedColumns: any, loginUser: any, pageObj?: any){
    displayedHeaders.unshift('sr_no');
    displayedColumns.unshift('srNo');
    if(displayedHeaders.includes('organization_name')){
      loginUser == 'unitAdmin' ? (displayedHeaders.includes('unit_name') ? (displayedHeaders.splice(1, 2), displayedColumns.splice(1, 2)) : (displayedHeaders.splice(1, 1), displayedColumns.splice(1, 1))) :loginUser == 'orgAdmin' ? (displayedHeaders.splice(1, 1), displayedColumns.splice(1, 1)) : '';
    }
    (pageObj?.viewFlag == 1 || pageObj?.deletedFlag == 1 || pageObj?.isExtraAction) ? (displayedHeaders.push('action'), displayedColumns.push('action')) : '';
    const obj = {
      tableHeaders: displayedHeaders,
      displayedColumns: displayedColumns,
      delete: pageObj?.deletedFlag == 0 ? false : true,//used for page right access
      view: pageObj?.viewFlag == 0 ? false : true,//used for page right access
    }
    return obj
  }
  /****************************** Show/Hide Table Header dynamically - End Here *********************/

  /****************************** Logout Function - Start Here *********************/
  redirectToLoginHome(flag?: any){    
    localStorage.clear();
    sessionStorage.clear();
    flag == "Login" ? this.routerLinkRedirect('/login') : this.routerLinkRedirect('/home');
  }
  /****************************** Logout Function - End Here *********************/

  /****************************** Apply Discount Function(Mostly Used in Account Module) - Start Here *********************/
  applyDiscount(label: String, rate?:any ,quantity?:any, discount?:any, discountInR?:any) {
    let price:any='';
    if (rate && quantity && (discount || discountInR)) {
      if (label == 'percentage') {
        const discountInRs = ((Number(quantity) * rate * Number(discount)) / 100);
        price=(discount ? this.setTwoDigitsAfterDecimal(discountInRs): '')
      } else {
        const discountInRs = (Number(discountInR * 100)) / (Number(quantity) * rate);
        price=(discountInR ? this.setTwoDigitsAfterDecimal(discountInRs) : '')
      }
    }
    return price
  }
 /****************************** Apply Discount Function(Mostly Used in Account Module) - End Here *********************/

 /****************************** Final Ammount by Applying RoundOff (Mostly Used in Account Module) - Start Here *********************/
  finalTotalByRoundOff(MaterialTotalAmount:any, roundOffValue:any) {
    let returnObj={ finalAmmount:0.00, roundOff:'', changingControl:'finalAmount' };
    roundOffValue= typeof(roundOffValue)=='number' ? roundOffValue.toString():roundOffValue ;
   const flag= roundOffValue ? (typeof(roundOffValue)=='number' ? roundOffValue.toString():roundOffValue).match('^([0-9.-])'):true;
      if(flag|| !roundOffValue ){
        returnObj.finalAmmount = (roundOffValue?.charAt(0)=='-' && roundOffValue.length==1)? Number( this.setTwoDigitsAfterDecimal(MaterialTotalAmount)):  (Number(this.setTwoDigitsAfterDecimal(MaterialTotalAmount + Number(roundOffValue || 0))));
        returnObj.changingControl='finalAmount'
      }else{
        returnObj.changingControl='roundOff'
      }
    return returnObj
  }
  /****************************** Apply Discount Function(Mostly Used in Account Module) - End Here *********************/

  /****************************** Print Preview - Start Here *********************/
  printPreview(){
    this.getPrintPageName() ? this.document.title = this.getPrintPageName() : '',
    window.print();
  }
  /****************************** Print Preview - End Here *********************/

  setPrintHeaderReportObj(obj:any){
    this.printHeaderDataForReportObj=obj
  }
  getPrintHeaderReportObj(){
    // return this.printHeaderDataForReportObj;
    
    //code updated because print header API updated with organization
    let filterData: any = localStorage['filterData'] ? JSON.parse(localStorage['filterData']) : '';
    var tempObj = {
      organization : this.printHeaderDataForReportObj?.organizationId ? this.printHeaderDataForReportObj?.organizationId : filterData?.filterValue?.organization,
      unit: (this.printHeaderDataForReportObj?.unitId > 0) ? this.printHeaderDataForReportObj?.unitId : filterData?.filterValue?.unit
    }
    return tempObj;
  }

  /****************************** Set Custom Name for Print Preview - Start Here *********************/
  setPrintPageName(reportName?: any, fromDate?: any, toDate?:any, additionalInfo?: any){
    var downloadRptNm = reportName;
    downloadRptNm += (fromDate ? ('-' + this.dateFormat(fromDate,'dot')) : '');
    downloadRptNm += (toDate ? ('-To-' + this.dateFormat(toDate,'dot')) : '');
    downloadRptNm += (additionalInfo ? ('-' + additionalInfo) : '');
    this.printPageName = downloadRptNm;
  }
  getPrintPageName(){
    return this.printPageName;
  }
  /****************************** Set Custom Name for Print Preview - End Here *********************/

  /****************************** Get Routing URL - Start Here *********************/
  getRoutingUrl(){
    return this.router?.url;
  }
  /****************************** Get Routing URL - End Here *********************/

  /****************************** Get TwentyFour Hour DateTime - Start Here *********************/
  getTwentyFourHourDateTime(date: any, amPmString: any) {
    var d = new Date(date + ' ' + amPmString);
    return d;
  }
  /****************************** Get TwentyFour Hour DateTime - End Here *********************/

  /****************************** Get Time From DateTime - Start Here *********************/
  getTimeFromDateTime(dateWithTime: any){
    var date = new Date(dateWithTime);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var hours12Format = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
    return hours12Format;
  }

  convertTimeFrom24To12Format(time: any){
    var tSplit = time.split(':');
    var hours = tSplit[0], minutes = tSplit[1];
    hours = hours > 12 ? hours - 12 : hours;
    var hours12Format = (hours < 10 ? hours : hours) + ':' + minutes + (tSplit[0] > 12 ? ' PM' : ' AM');
    return hours12Format;
  }
  /****************************** Get Time From DateTime - End Here *********************/

  /****************************** Convert Balance To CR/DR - Start Here *********************/
  convertBalanceToCRDR(balance: any){
    return ((balance == 0 || balance == '0') ? this.setTwoDigitsAfterDecimal(balance) : balance < 0 ? 'DR ' + (this.setTwoDigitsAfterDecimal((balance * (-1)))) : 'CR ' + this.setTwoDigitsAfterDecimal(balance));
  }
  /****************************** Convert Balance To CR/DR - End Here *********************/

/****************************** Set Validation for Unit Applicable  *********************/
  setOnUnitApplicable(val: any, formGroup:any, formControl:any, formControlValue:any){
    if(val){
      formGroup[formControl].setValue(formControlValue ||'');
      formGroup[formControl].setValidators([Validators.required]);
    }else{
      formGroup[formControl].setValue(0);
      formGroup[formControl].clearValidators();
    }
    formGroup[formControl].updateValueAndValidity();
    return formGroup
  }

  /****************************** Display Yes/No Depends on Condition - Start Here *********************/
  displayYesNoDependsOnCondition(value: any){
    return (value == 1 || value == true) ? 'Yes' : 'No';
  }
  /****************************** Display Yes/No Depends on Condition - End Here *********************/

   /***************************** Calculate snf/degree as Per Assigned Collection Type - Start Here ********************/
   calculateDegreeSnf(lable: any, formData: any) {
    let val = 0;
    if (lable == 'SNF') {
      val = (Number(formData.snf) - (0.36 + 0.21 * Number(formData.fat))) * 4;
    }
    else {
      val = (Number(formData.degree) / 4) + (0.36 + 0.21 * Number(formData.fat));
    }
    return  lable == 'SNF' ? this.setTwoDigitsAfterDecimal(val): this.setSingleDigitsAfterDecimal(val);
  }
  /***************************** Calculate snf/degree as Per Assigned Collection Type - End Here ********************/
  
}
