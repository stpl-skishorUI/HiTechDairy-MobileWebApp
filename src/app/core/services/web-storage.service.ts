import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AESEncryptDecryptService } from 'src/app/core/services/aesencrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  theme = new BehaviorSubject('');
  forwordBackwordFlag = new BehaviorSubject('');
  milkCollectionAccountArray = new BehaviorSubject<any>([]);
  numFormat: any;
  selectedTheme = 'light';
  arrayData = new Array();
  data: any;
  private profile = new BehaviorSubject('');
  pageListLangChange:any = new BehaviorSubject('');
  printHeaderDetails= new BehaviorSubject(''); 
  globalYearDetails= new BehaviorSubject('');
  constructor(private AESEncryptDecryptService: AESEncryptDecryptService, private router: Router) {
    this.getLoggedInLocalstorageData();
  }

  //Get Theme
  getTheme() {
    return this.theme.asObservable();
  }

  //Set Theme
  setTheme(className: any) {
    this.theme.next(className);
    this.selectedTheme = className == 'lightMode' ? 'light' : 'dark';
  }

  //Get Profile Data For Setting Profile
  getProfileData() {
    return this.profile.asObservable()
  }

  //Set Profile Data in User Register
  setProfileData(pData: any) {
    this.profile.next(pData)
  }

  // Check User isLoggedIn or not
  checkUserIsLoggedIn() {
    if (localStorage.getItem('mobileUserLoggedInData'))
      return true;
    else return false;
  }

  // Get LocalStorage Data
  getLoggedInLocalstorageData() {
    if (this.checkUserIsLoggedIn() == true) {
      var decryptData = JSON.parse(this.AESEncryptDecryptService.decrypt(localStorage['mobileUserLoggedInData']));
      this.data = decryptData;
      return this.data;
    }
  }

  // Get User Id
  getUserId() {
    return this.data ? this.data?.id : 0;
  }

  // Get Server Id
  getServerId() {
    return this.data ? this.data?.serverId : 0;
  }

  // Get Organization Id
  getOrgId() {
    return this.data ? this.data?.organizationId > 0 ? this.data?.organizationId : '' : '';
  }

  // Get Unit Id
  getUnitId() {
    return this.data ? this.data?.unitId > 0 ? this.data?.unitId : '' : '';
  }

  // Get User Type Id
  getUserTypeId() {
    return this.data?.userTypeId;
  }

  // Get Financial Year Id
  getFfYearId() {
    return (this.data?.fYearId || 0);
  }

  // Get User SubType Id
  getUserSubTypeId() {
    return this.data?.subUserTypeId;
  }

  // Get Organization Code
  getOrganizationCode() {
    return this.data?.organizationCode;
  }

  // Get Department Id
  getDepartmentId() {
    return this.data?.departmentId;
  }

  // Get Unit Code
  getUnitCode() {
    return this.data?.unitCode;
  }

  // Get Party Id
  getPartyId() {
    return this.data?.partyId;
  }

  // Get State, District, Taluka, Village Id
  getGeoTerritoryData() {
    var territory = {
      stateId: this.data?.stateId,
      districtId: this.data?.districtId,
      talukaId: this.data?.talukaId,
      villageId: this.data?.villageId
    }
    return territory
  }

  // Get CreatedBy Details
  createdByProps(): any {
    return {
      "createdBy": this.getUserId() || 0,
      "modifiedBy": this.getUserId() || 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false
    }
  }

  // Get All Page Details For Sidebar
  getAllPageName() {
    if (this.checkUserIsLoggedIn() == true) {
      let getAllPageName = this.getLoggedInLocalstorageData();
      return getAllPageName.pageLstModels;
    }
  }

  // Get Dashboard Icons
  getAllDashboardIcons() {
    if (this.checkUserIsLoggedIn() == true) {
      let dashArray: any = new Array();
      this.data.dashboardLstModel.forEach((x: any) => {
        x ? dashArray.push(x) : ''
      })
      return dashArray;
    }
  }

  // Get Refresh Token String
  tokenExpireRefreshString() {
    let loginObj: any = this.getLoggedInLocalstorageData();
    let sessionData = JSON.parse(loginObj).responseData1;
    return sessionData.refreshToken.tokenString;
  }

  // Used In Milk Collection - To Get Customer Details From LocalStorage(API Response Saved)
  getMilkCollectionAccountArray() {
    this.milkCollectionAccountArray.subscribe((x: any) => { this.arrayData = x });
    return this.arrayData;
  }

  // Get Selected Page Details Object
  getPageDetailsObj(pageName: string) {
    const pageObj = this.getAllPageName()?.find((x: any) => x.pageLink == pageName)
    return pageObj
  }

  // Set Filter To LocatStorage
  setFilterToLocalStorage(data: any) {
    localStorage.setItem('filterData', JSON.stringify(data))
  }

  // Get Filter From LocalStroage
  getFilterFromLocalStorage() {
    let filterData: any = localStorage['filterData'] ? JSON.parse(localStorage['filterData']) : '';
    return this.router?.url == filterData?.pageName ? filterData?.filterValue : localStorage.removeItem('filterData');
  }

  // Setting For Calculating FAT/SNF/CLR
  getAccountSetting(id: number) {
    return Number((this.data?.appSetupSettings?.find((x: any) => x.settingId == id))?.settingValue);
  }
  
  // Get min/max date depends on financial year
  getMinMaxDateDependsOnSelectedfYear(){
    // var fYear = this.getLoggedInLocalstorageData()?.financialYear, tempObj: any, maxDate: any;
    // fYear = fYear?.split('-');
    // if(fYear){
    //   maxDate = new Date() > new Date('March 31 ' + fYear[1]) ? new Date('March 31 ' + fYear[1]) : new Date();
    //   tempObj = {
    //     min: new Date('April 1 ' + fYear[0]),
    //     max: maxDate || new Date()
    //   }
    // }
    this.getLoggedInLocalstorageData();
     let tempObj = {
        min: new Date(this.data?.startDate),
        max: new Date(this.data?.endDate)
      }
    return tempObj;
  }
}
