import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { WebStorageService } from './web-storage.service';
import { ConfigService } from './config.service';
import { CommonMethodsService } from './common-methods.service';
import { AESEncryptDecryptService } from './aesencrypt-decrypt.service'

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private apiService: ApiService, private webService: WebStorageService, private configService: ConfigService,
    private commonService: CommonMethodsService,private AESEncryptDecryptService: AESEncryptDecryptService
  ) { }

  // **************************** Get All State *************************** /
  getAllState() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllState', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All District by ID *************************** /
  getAllDistrictByStateId(id: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllDistricts?StateId=' + id, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Taluka by ID *************************** /
  getAllTalukaByDistrictId(id: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllTaluka?DistrictId=' + id, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Village by ID *************************** /
  getAllVillageByTalukaId(id: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllVillages?TalukaId=' + id, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Organization by ID *************************** /
  getAllOrganizationByUserId(id: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllOrganization?UserId=' + id, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Employye by Organization *************************** /
  getAllEmployeeByOrg(orgId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/getAllEmployeeByOrg?OrganizationId=' + orgId , false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Unit by ID *************************** /
  getAllUnitByOrgIdUserId(orgId: number, usrId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllUnit?OrganizationId=' + orgId + '&UserId=' + usrId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Unit by ID for setting *************************** /
  getAllSettingUnitByOrgIdUserId(orgId: number, usrId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllUnitforSettings?OrganizationId=' + orgId + '&UserId=' + usrId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Account Type *************************** /
  getAllAccountType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllAccountType?UserId=' + this.webService.getUserId(), false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Shift *************************** /
  getAllShift() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllShift', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  // **************************** Get All Sort Order *************************** /

  // **************************** Get All Shift *************************** /
  getAllTallyVoucherType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetTallyVoucherType', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  // **************************** Get All Sort Order *************************** /

  // **************************** Get Tankers number *************************** /
  getAllTankerNumber(orgId?: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'DcChallan/GetTankerDetails?OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  // **************************** Get All Tanker Number *************************** /
  getAllSortOrder() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetSortOrder', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  // **************************** Get All Custemer *************************** /
  getAllCustemerList(unitId?: any, orgId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllcustomerList?UnitId=' + unitId + '&OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  // **************************** Get All Party ( procurement)   *************************** /
  getAllPartyList(unitId?: any, orgId?: any, userId?: any, routeId?: any, isRoute?: any) {
    var str = 'UnitId=' + unitId + '&UserId=' + userId + '&OrgnizationId=' + orgId + (isRoute ? '&RouteId=' + routeId : '');
    var url = (isRoute ? 'MilkBillMultiple/GetPartylistByRoute?' : 'MilkBill/GetPartylist?') + str;
    return new Observable((obj) => {
      this.apiService.setHttp('GET', url, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Department by ID *************************** /
  getAllDepartmentByUserId(id: number, orgId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllDepartment?UserId=' + id + '&OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Designation by ID *************************** /
  getAllDesignationByUserId(id: number, orgId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllDesignation?DepartmentId=' + id + '&OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Primary Unit *************************** /
  getAllPrimaryUnit() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllPrimaryUnit', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Material Type by ID *************************** /
  getAllMaterialTypeByUserId(id: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllMaterialType?OrganizationId=' + id, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All SubMaterial Type by ID *************************** /
  getAllSubMaterialTypeByUserId(id: number, mId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllMaterialSubType?OrganizationId=' + id + '&MaterialTypeId=' + mId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Bank by ID *************************** /
  getAllBankByOrgIdUserId(orgId: number, uId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllBank?OrganizationId=' + orgId + '&UserId=' + uId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Bank by ID *************************** /
  getAllBankBranchById(orgId: number, bId: number, uId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllBankBranch?OrganizationId=' + orgId + '&BankId=' + bId + '&UserId=' + uId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Customer Type *************************** /
  getAllCustomerType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllpartyTypeForPartyMaster', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Customer Type for Tally *************************** /
  getAllPartyType(flag?: any) {
    var subApi = (flag == 'tally' ? 'GetAllPartyTypeForLedger' : 'GetAllPartyType');
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/' + subApi, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Category *************************** /
  getAllCategory() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllCategory', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Rate Card Group *************************** /
  getAllRateCardGroup(orgId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllCustomerGroup?OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Route *************************** /
  getAllRoute(unitId?: any, orgId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllRoute?UnitId=' + unitId + '&OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.next(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Route *************************** /
  GetAllRoute_v1(unitId?: any, orgId?: any, routeTypeId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllRoute_v1?UnitId=' + unitId + '&OrganizationId=' + orgId + '&RouteTypeId=' + routeTypeId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Route Type *************************** /
  getAllRouteType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllRouteType', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Milk Type *************************** /
  getAllMilkType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllMilkType?UserId=' + this.webService.getUserId(), false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Vehicle Type **************************** /
  getAllVehicleType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllVehicleType', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Block Type **************************** /
  getAllBlockType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllBlockType', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All User Type **************************** /
  getAllUserType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllUserType?OrganizationId=' + (this.webService.getOrgId() || 0), false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Financial Year **************************** /
  getAllFinancialYear() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetFinancialYear', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  // *************************** Get All Party ( Direct Tanker Purchase)   ************************** /
  getAllDtpParty(orgId?: any, unitId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/DirectTankerPurchaseNew/GetAllPartyNameListForDTP?OrganizationId=' + orgId + '&UnitId=' + unitId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Customer **************************** /
  GetCustomerName(unitID: number, customerTypeId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetCustomerName_Code?UnitId=' + unitID + '&PartypeId=' + customerTypeId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Material Details with Code **************************** /
  GetMaterialDetailsbyMCode(orgId?: number, unitID?: number, MaterialCode?: any) {
    MaterialCode = MaterialCode ? MaterialCode : '';
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetMaterialDetailsbyMCode?UnitId=' + unitID + '&OrgId=' + orgId + '&MaterialCode=' + MaterialCode, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Material Details by Under Organization **************************** /
  GetMaterialUnderOrganization(orgId?: number, unitId?: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetMaterialDetailsbyMCode?UnitId=' + unitId + '&OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Module **************************** /
  GetAllModule(userTypeId: any, orgId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetModuleForAccess?UsertypeId=' + userTypeId + '&OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Sub Module **************************** /
  GetAllSubModule(moduleId: any, uesrTypeId: any, orgId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetSubModuleByModuleForAccess?ModuleId=' + moduleId + '&UsertypeId=' + uesrTypeId + '&OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get All Stock Yard List By Unit ID ***************** /
  GetAllStockYardList(unitId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllStockYardList?UnitId=' + unitId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get All Voucher Sub Type ***************** /
  GetAllVoucherSubType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetVoucherSubType', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get All Asset Category ***************** /
  GetAllAssetCategory(orgId: number, unitId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAssetCategory?OrganizationId=' + orgId + '&UnitId=' + unitId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get All Asset SubCategory ***************** /
  GetAllAssetSubCategory(id: number, unitId?: any, cId?: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAssetSubCategory?OrganizationId=' + id + '&UnitId=' + unitId + '&CategoryId=' + cId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get All Brand Name ***************** /
  GetAllBrandName(id: number, unitId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetBrandName?OrganizationId=' + id + '&UnitId=' + unitId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get Asset Status ***************** /
  GetAssetStatus() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAssetStatus', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get Payment Modes ***************** /
  GetPaymentModes() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetPaymentModes', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get Models By Brand Id ***************** /
  GetAllModelsByBrandId(orgId: any, unitId: any, brandId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllModelsonBrandId?OrganizationId=' + orgId + '&UnitId=' + unitId + '&BrandId=' + brandId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get Suppliers ***************** /
  GetAllSuppliers(orgId: any, unitId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllSuppliers?OrganizationId=' + orgId + '&UnitId=' + unitId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get Suppliers ***************** /
  GetAssetNameList(orgId: any, unitId: any, categoryId: any, subCategoryId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAssetNameList?OrganizationId=' + orgId + '&UnitId=' + unitId + '&CategoryId=' + categoryId + '&SubCategoryId=' + subCategoryId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  getAssignTo() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAssignTo', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  //*******************************Get PO Number Array By Party Id ***************** /
  GetPONumberArray(partyId: any,) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetPoNumberByPartyId?PartyId=' + partyId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Route *************************** /
  getAllDieselSupplier(orgId?: any, unitId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllDieselSupplier?OrganizationId=' + orgId + '&UnitId=' + unitId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //*******************************Get PO Number Array By Party Id with GRN Completed  ***************** /
  GetPoNumberByPartyIdForGRN(partyId: any,) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetPoNumberByPartyIdForGRN?PartyId=' + partyId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllUsers(assnTo: number, DeptId: number, Desig: number, orgId: number, unitId: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllUsers?OrganizationId=' + orgId + '&UnitId=' + unitId + '&AssignTo=' + assnTo + '&DeptId=' + DeptId + '&DesignitionId=' + Desig, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  convertImageIntoBase64(url: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/ImageUrlToBase64?imageUrl=' + url, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllSupervisors(orgId: any, unitId: any, userId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/getAllSupervisers?OrganizationId=' + orgId + '&UnitId=' + unitId + '&UserId=' + userId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllMilkCollectionTypes(orgId: any, unitId: any, userId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/getAllMilkCollectionTypes?OrganizationId=' + orgId + '&UnitId=' + unitId + '&UserId=' + userId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllOLTs(orgId: any, unitId: any, userId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/getAllOLTs?OrganizationId=' + orgId + '&UnitId=' + unitId + '&UserId=' + userId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllAlcoholMeasures(orgId: any, unitId: any, userId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/getAllAlcoholMeasures?OrganizationId=' + orgId + '&UnitId=' + unitId + '&UserId=' + userId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllVehicles(orgId: any, unitId: any, userId: any, tranporterId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/getAllVehicles?OrganizationId=' + (orgId || 0) + '&UnitId=' + (unitId || 0) + '&UserId=' + (userId || 0) + '&TransporterId=' + (tranporterId || 0), false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAdultration(orgId: any, unitId: any, userId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/getAllAdultrations?OrganizationId=' + orgId + '&UnitId=' + unitId + '&UserId=' + userId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getPageLinkedTo(moduleId: any, submoduleId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetPageLinkedTo?ModuleId=' + moduleId + '&SubmoduleId=' + submoduleId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  GetAllLedgers(orgId: any, accGroupId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllLedgers?OrganizationId=' + orgId + '&AccountGroupId=' + accGroupId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  GetAllAccountGroups() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllAccountGroups', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  GetAllSalesRateCard(orgId: any, grpId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllSalesRateCardGroup?OrganizationId=' + orgId + '&GroupTypeId=' + grpId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  //---------------------------------- All Transporters by Org   -------------------------------------//
  GetAllTransporterName(orgId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllTransporterName?OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  //---------------------------------- All PartyName List IsBulk by Org  -------------------------------------//
  GetAllPartyNameListbyIsBulkForTransportRate(orgId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllPartyNameListbyIsBulkForTransportRate?OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Custemer *************************** /
  getAllCustemers(unitId?: any, orgId?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllcustomers?UnitId=' + unitId + '&OrganizationId=' + orgId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Rate Card Group Updated API *************************** /
  getAllRateCardGroupUpdated(orgId?: any, group?: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllCustomerGroup_v1?OrganizationId=' + orgId + '&GroupTypeId=' + group, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Rate Card Assign Status *************************** /
  GetAllRateCardAssignStatus() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllRateCardAssignStatus', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Rate Card List By Id *************************** /
  GetAllRateCardListById(shiftId: any, accType: any, orgId: any, rateCardTypeId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetRatecardList_v2?ShiftId=' + shiftId + '&MilkTypeId=' + accType + '&OrgId=' + orgId + '&RateCardTypeId=' + rateCardTypeId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Unit with Isbranch *************************** /
  GetAllUnitWithIsBranch(orgId: any, userId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllUnitwithIsBranch?OrganizationId=' + orgId + '&UserId=' + userId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Branch Unit *************************** /
  GetAllBranchUnit(orgId: any, userId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllBranchUnit?OrganizationId=' + orgId + '&UserId=' + userId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Stock By Unit *************************** /
  GetAllStockByUnit(unitId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllStockyardbyUnitBranch?UnitId=' + unitId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Invoice No. List *************************** /
  GetAllInvoiceNoList(partyId: any, invoiceType: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllInvoiceNoList?PartyId=' + partyId + '&InvoiceType=' + invoiceType, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Invoice No. List *************************** /
  GetReferenceNo(OrganizationId: any, UnitId: any, TypeId: any) {  //TypeId ==> 1-daily Entry, 2- tanker meter Reading, 3- driver bhatta 
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/DailyEntryRegister/GetReferenceNo?OrganizationId=' + OrganizationId + '&UnitId=' + UnitId + '&TypeId=' + TypeId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Invoice No. List *************************** /
  GetAllBulkSaleParty(OrganizationId: any, UnitId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllBulksaleParty?OrganizationId=' + OrganizationId + '&UnitId=' + UnitId, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Language *************************** /
  getAllLanguage(id: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/MultiLanguageAttribute/GetAllLanguage?InUse=' + id, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  
   // **************************** Get All  DTP Challan Status *************************** /
   getAllDTPChallanStatus() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllDTPChallanStatus', false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  /***************************************************** HRMS API *****************************************/
  // **************************** Get All HRMS Country State *************************** /
  getAllHrmsCountry() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-country-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All HRMS State *************************** /
  getAllHrmsState(cntId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-state-list?countryId=' + cntId, false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All HRMS District by ID *************************** /
  getAllHrmsDistrictByStateId(id: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-district-list?stateId=' + id, false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Prefix State *************************** /
  getAllPrefix() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-prefix-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Blood Group State *************************** /
  getAllBloodGroup() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-bloodgroup-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Gender State *************************** /
  getAllGender() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-gender-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Organization by ID *************************** /
  getAllOrganizationById(id: number, orgId: any) {
    id = this.configService.appId;
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-organization-list?appId=' + id + '&organizationId=' + orgId + '&isExternal=' + this.configService.isExternal, false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Organization by ID *************************** /
  getAllDepartmentById(id: number, orgId: any) {
    id = this.configService.appId;
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-department-list?appId=' + id + '&organizationId=' + orgId + '&isExternal=' + this.configService.isExternal, false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Designation by Organization & Department *************************** /
  getAllDesignationById(id: number, orgId: any, deptId: any) {
    id = this.configService.appId;
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-designation-list?appId=' + id + '&organizationId=' + orgId + '&departmentId=' + deptId + '&isExternal=' + this.configService.isExternal, false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Employee by Organization & Branch/unit *************************** /
  getEmpoyeeList(id: number, orgId: any, branchId: any) {
    id = this.configService.appId;
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Employee/get-Employee-List?appId=' + id + '&organizationId=' + orgId + '&branchId=' + branchId + '&isExternal=' + this.configService.isExternal, false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Education Type List *************************** /
  getEducationTypeList() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-educationType-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Year List *************************** /
  getYearList() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-year-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Bank List *************************** /
  getBankList(orgId: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-bank-list?appId=' + this.configService.appId + '&organizationId=' + (orgId || 0) + '&isExternal=' + this.configService.isExternal + '&bankId=0', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  // **************************** Get All Document List *************************** /
  getDocumentList() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-document-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //***************************** Get All Branch list *************************** /
  getBranchList(id: number, orgId: any, branchId: any) {
    id = this.configService.appId;
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-branch-list?appId=' + id + '&organizationId=' + orgId + '&branchId=' + branchId + '&isExternal=' + this.configService.isExternal, false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //***************************** Get All Head Type list *************************** /
  getHeadTypeList() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-headType-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //***************************** Get All Calculation Type list *************************** /
  getCalculationTypeList() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-calculationType-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //***************************** Get All Salary Structure List *************************** /
  getSalarystructureList(id: any, orgId: any, unitId: any) {
    id = this.configService.appId;
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-salarystructure-list?appId=' + id + '&organizationId=' + orgId + '&branchId=' + unitId + '&isExternal=' + this.configService.isExternal, false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //***************************** Get All Leave Type List *************************** /
  getLeaveTypeList() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-LeaveType-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //***************************** Get All Employee List *************************** /
  getEmployeeList(id: any, orgId?: any, branchId?: any, departmentId?: any, empType?: any) {
    id = this.configService.appId;
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-EmployeeList-list?appId=' + id + '&organizationId=' + orgId + '&branchId=' + branchId + '&departmentId=' + departmentId + '&isExternal=' + this.configService.isExternal + '&EmployeeType=' + (empType || 1), false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  //***************************** Get All Employee Type *************************** /
  getEmployeeType() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/Dropdown/get-EmployeeType-list', false, false, false, 'hrmsDairyService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getServerDateTime() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'Login/Get-Current-Date-Time', true, false, false, 'priyadarshaniService')
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getReportHeaderDetails(orgId?:any, unitId?:any) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'api/GlobalHeader/GetAllGlobalHeader_V1?OrganizationId='+ [Number(orgId) || 0] + '&UnitId=' + [Number(unitId) || 0], true, false, false, 'priyadarshaniService')
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }
}