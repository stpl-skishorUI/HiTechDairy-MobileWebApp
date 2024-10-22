import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MasterService } from 'src/app/core/services/master.service';
import { AESEncryptDecryptService } from 'src/app/core/services/aesencrypt-decrypt.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-visit-entry-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule
  ],
  templateUrl: './visit-entry-list.component.html',
  styleUrls: ['./visit-entry-list.component.scss']
})
export class VisitEntryListComponent {

  visitEntryArray = new Array();
  tableDatasize!: number;
  totalPages!: number;
  pageNumber: number = 1;
  pageSize: number = 10;
  filterForm!: FormGroup;
  get f(){ return this.filterForm.controls};
  @ViewChild('formDirective') private formDirective!: NgForm;

  organizationArray = new Array();
  orgCtrl: FormControl = new FormControl(); 
  orgSubject: ReplaySubject<any> = new ReplaySubject<any>();

  allUnits = new Array();
  unitCtrl: FormControl = new FormControl();
  unitSubj: ReplaySubject<any> = new ReplaySubject<any>();

  employeeArray = new Array();
  employeeCtrl: FormControl = new FormControl();
  employeeSubject: ReplaySubject<any> = new ReplaySubject<any>();

  tooltipMessage = 'Select All / Unselect All';
  _onDestroy = new Subject<void>();
  isChecked: boolean = false;
  currentDate=new Date()
  selectedIndex: number = 0;
  isSearch: boolean = false;

  constructor(public webService: WebStorageService,
    private fb: FormBuilder,
    private commonMethod: CommonMethodsService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private AESEncryptDecryptService: AESEncryptDecryptService,
    private masterService: MasterService,
    private errorService: ErrorService) {
      this.activatedRoute.params.subscribe(params => {
        this.getLoggedInUserDetails(params['id']);
      });
    }

  ngOnInit(){
    this.searchControls();
    this.createFilterForm();
    this.getOrganization();
  }

  getLoggedInUserDetails(mNo: any){
    var req = { mobileNo: mNo };
    this.apiService.setHttp('POST', 'Login/UserLoginBymobile', false, req, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            sessionStorage.setItem('loggedIn', 'true');            
            var loginData = this.AESEncryptDecryptService.encrypt(JSON.stringify(res?.responseData));            
            localStorage.setItem('mobileUserLoggedInData', loginData);
          } else {
            this.commonMethod.matSnackBar(res.statusMessage, 1)
          }
        },
        error: (err: any) => {
          this.errorService.handleError(err.status);
        },
      });
  }

  createFilterForm(){
    this.filterForm = this.fb.group({
      organization: [this.webService.getOrgId() || '',[Validators.required]],
      unit: [this.webService.getUnitId() || '',[Validators.required]],
      fromDate: [new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)],
      toDate: [new Date()],
      employeeList: ['',[Validators.required]],
    })
  }

  searchControls(){
    this.orgCtrl.valueChanges.pipe().subscribe(() => { this.commonMethod.filterArrayDataZone(this.organizationArray,this.orgCtrl,'organizationName',this.orgSubject) });
    this.unitCtrl.valueChanges.pipe().subscribe(() => { this.commonMethod.filterArrayDataZone(this.allUnits, this.unitCtrl, 'unitName', this.unitSubj) });
    this.employeeCtrl.valueChanges.pipe().subscribe(() => { this.commonMethod.filterArrayDataZone(this.employeeArray, this.employeeCtrl, 'employeeName', this.employeeSubject) });
  }

  getOrganization(obj?:any) {
    this.masterService.getAllOrganizationByUserId(this.webService.getUserId()).subscribe({
      next: ((res: any) => {
        if (res.statusCode == "200") {
          this.organizationArray = res.responseData;
          this.commonMethod.filterArrayDataZone(this.organizationArray,this.orgCtrl,'organizationName',this.orgSubject);
          this.webService.getOrgId() || obj?.organization ? (this.f['organization'].setValue(this.webService.getOrgId() || obj?.organization)) : '';
          
        }
        else {
          this.clearDependancy('org');
        }
      }),
      error: () => { this.clearDependancy('org'); }

    })
  }

  getUnit(obj?: any) {
    const orgId = this.f['organization'].getRawValue();
    this.masterService.getAllUnitByOrgIdUserId(orgId, this.webService.getUserId()).subscribe({
      next: ((res: any) => {
        if (res.statusCode == "200") {
          this.allUnits = res.responseData;
          this.commonMethod.filterArrayDataZone(this.allUnits, this.unitCtrl, 'unitName', this.unitSubj);
          (this.webService.getUnitId() || obj?.unit) ? (this.f['unit'].setValue(this.webService.getUnitId() || obj?.unit)) : '';

        }
        else {
          this.clearDependancy('unit');
        }
      }), error: () => { this.clearDependancy('unit'); }
    })
  }

  getEmployeeDetails() {
    this.masterService.getAllEmployeeByOrg((this.f['organization'].getRawValue() || 0)).subscribe({
      next: ((res: any) => {
        if (res.statusCode == "200") {
          this.employeeArray = res.responseData;
          this.commonMethod.filterArrayDataZone(this.employeeArray, this.employeeCtrl, 'employeeName', this.employeeSubject);
        }
        else {
          this.clearDependancy('employee');
        }
      }), error: () => { this.clearDependancy('employee'); }
    })
  }

  getTableDetails(flag?: any) {
    this.filterForm.updateValueAndValidity();
    if(this.filterForm.invalid){
      return;
    }else{
      this.isSearch = true;
      const formData = this.filterForm.getRawValue();
      let str = ('pageno=' + +(this.pageNumber || 0) + '&pagesize=' + 10 + '&UnitId=' + (formData?.unit || 0) + '&PartyIds=' + (formData?.employeeList?.toString() || '') + '&fromDate=' + (this.commonMethod.dateFormat(formData?.fromDate, 'year')) +
        '&organizationId=' + (formData?.organization || 0) + '&toDate=' + (this.commonMethod.dateFormat(formData?.toDate, 'year')));
      this.apiService.setHttp('GET', 'api/VisitEntry/GetAllVisitEntries?' + str, false, false, false, 'priyadarshaniService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            this.visitEntryArray = res.responseData;
            this.tableDatasize = res.responseData1?.totalCount;
            this.totalPages = res.responseData1?.totalPages;

          } else {
            this.commonMethod.checkDataType(res.statusMessage) == false
              ? this.errorService.handleError(res.statusCode)
              : '';
            this.visitEntryArray = [];
            this.tableDatasize = 0;
          }
        },
        error: (err: any) => {
          this.errorService.handleError(err.status);
        },
      });
    }
  }

  toggleSelectAll(selectAllValue: boolean, flag: any) {    
    var arr = this.employeeArray.map((x: any) => x.id)
    if(flag != 'Single'){
      this.employeeSubject
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.f['employeeList'].patchValue(selectAllValue ? [...arr] : []);
      });
    }else{
      this.isChecked = ((arr.length != this.f['employeeList'].value.length) ? false : true);
    }
  }

  clearDependancy(flag: any){
    switch(flag){
      case 'org': this.allUnits = [], this.unitSubj.next(null), this.employeeArray = [], this.employeeSubject.next(null);
      break;
    }
  }

  redirectToAddVisitEntry(){
    this.commonMethod.routerLinkRedirect('/add-visit-entry');
  }

  tableClickEvents(obj?: any, status?: any, _index?: any) {
    switch (status) {
      case 'Pagination':
        this.pageNumber = obj.pageIndex + 1;
        this.selectedIndex = 0;
        this.getTableDetails();
        break;
      // case 'View':
      //   this.updateMilkCollectionDetails(obj);
      //   break;
      // case 'Edit':
      //   this.updateMilkCollectionDetails(obj);
      //   break;
      // case 'Delete':
      //   this.globalDialogOpen(obj);
    }
  }

  resetForm(){
    this.formDirective && this.formDirective.resetForm();
    this.createFilterForm();
    this.isSearch = false;
  }
}
