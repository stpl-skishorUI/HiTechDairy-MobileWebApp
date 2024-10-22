import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { MasterService } from 'src/app/core/services/master.service';
import { ApiService } from 'src/app/core/services/api.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-add-visit-entry',
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
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-visit-entry.component.html',
  styleUrls: ['./add-visit-entry.component.scss']
})
export class AddVisitEntryComponent {

  registerForm!:FormGroup;
  get f(){ return this.registerForm.controls};
  organizationArray = new Array();
  orgCtrl: FormControl = new FormControl();
  orgSubject: ReplaySubject<any> = new ReplaySubject<any>();
  unitArray = new Array();
  unitCtrl: FormControl = new FormControl();
  unitSubject: ReplaySubject<any> = new ReplaySubject<any>();
  toUnitArray = new Array();
  toUnitCtrl: FormControl = new FormControl();
  toUnitSubject: ReplaySubject<any> = new ReplaySubject<any>();
  employeeArray = new Array();
  employeeCtrl: FormControl = new FormControl();
  employeeSubject: ReplaySubject<any> = new ReplaySubject<any>();
  editObj:any;
  editFlag:boolean=false;
  @ViewChild('formDirective') private formDirective!: NgForm;
  constructor( private fb:FormBuilder, public webService:WebStorageService, public commonService:CommonMethodsService,
    private masterService:MasterService, private apiService:ApiService, 
    private errorService:ErrorService
  ){

  }
  ngOnInit(){
    this.getFormControls();
    this.searchDataZone();
    !this.editObj ? this.getOrganation() : '';
  }

  getFormControls(data?:any){
    this.registerForm = this.fb.group({
      organizationId: [data? data?.organizationId : '',[Validators.required]],
      unitId: [data? data?.toUnitId : '',[Validators.required]],
      fromUnitId: [data? data?.fromUnitId :'',[Validators.required]],
      employeeId: [data? data?.partyId :'',[Validators.required]],
      visitDate: [data? new Date(data?.visitDate) :new Date(),[Validators.required]],
      visitTime: [data ? data?.visitTime: this.commonService.getTimeFromDateTime(new Date()),[Validators.required]],
      visitDetails: [data? data?.visitDetails :''],
    })
  }

  searchDataZone() {  //used for serachable dropdown when we reload the page
    this.orgCtrl.valueChanges.pipe().subscribe(() => { this.commonService.filterArrayDataZone(this.organizationArray,this.orgCtrl,'organizationName',this.orgSubject) });
    this.unitCtrl.valueChanges.pipe().subscribe(() => { this.commonService.filterArrayDataZone(this.unitArray,this.unitCtrl,'unitName',this.unitSubject) });
    this.toUnitCtrl.valueChanges.pipe().subscribe(() => { this.commonService.filterArrayDataZone(this.toUnitArray,this.toUnitCtrl,'unitName',this.toUnitSubject) });
    this.employeeCtrl.valueChanges.pipe().subscribe(() => { this.commonService.filterArrayDataZone(this.employeeArray,this.employeeCtrl,'employeeName',this.employeeSubject) });
  }

  getOrganation() {
    this.organizationArray = [];
    this.masterService.getAllOrganizationByUserId(this.webService.getUserId()).subscribe({
      next: ((res: any) => {
        if (res.statusCode == "200") {
          this.organizationArray = res.responseData;
          this.commonService.filterArrayDataZone(this.organizationArray,this.orgCtrl,'organizationName',this.orgSubject);
          this.webService.getOrgId() || this.editFlag ? (this.f['organizationId'].setValue(this.editObj?.organizationId || this.webService.getOrgId()),this.getUnit(), this.getEmployees()):'';
        }
        else {
          this.organizationArray = [];
        }
      }),
    })
  }
  getUnit(){
    this.masterService.getAllUnitByOrgIdUserId(this.f['organizationId']?.getRawValue(), this.webService.getUserId()).subscribe({
      next: ((res: any) => {
        if (res.statusCode == "200") {
          this.unitArray = res.responseData;
          this.toUnitArray = res.responseData;
          this.commonService.filterArrayDataZone(this.unitArray, this.unitCtrl, 'unitName', this.unitSubject);
          this.commonService.filterArrayDataZone(this.toUnitArray,this.toUnitCtrl,'unitName',this.toUnitSubject) ;
        }
        else {
          this.unitArray = [];
          this.toUnitArray = [];
        }
      }),
    })
  }
  getEmployees(){
    this.masterService.getAllEmployeeByOrg(this.f['organizationId']?.getRawValue()).subscribe({
      next: ((res: any) => {
        if (res.statusCode == "200") {
          this.employeeArray = res.responseData;
          this.commonService.filterArrayDataZone(this.employeeArray,this.employeeCtrl,'employeeName',this.employeeSubject);
        }
        else {
          this.employeeArray = [];
        }
      }),
    })
  }
  onSubmit(){
    this.registerForm.updateValueAndValidity();
    if(this.registerForm.invalid){
      return;
    }else{
      const formData=this.registerForm.getRawValue();
      const obj={
        "id": this.editFlag ? this.editObj?.id :0,
        "organizationId": formData?.organizationId || 0,
        "partyId": formData?.employeeId|| 0,
        "visitDate": this.commonService.dateFormat(formData?.visitDate,'dateWithTime'),
        "visitTime": formData?.visitTime || 0,
        "fromUnitId": formData?.fromUnitId || 0,
        "toUnitId": formData?.unitId || 0,
        "visitDetails": formData?.visitDetails,
        "createdBy": this.webService.createdByProps().createdBy,
        "modifiedBy": this.webService.createdByProps().modifiedBy
      }
      const str = 'api/VisitEntry/' + (this.editFlag ? 'UpdateVisitEntry' : 'AddVisitEntry');
        this.apiService.setHttp(this.editFlag ? 'put' : 'post', str, false, obj, false, 'priyadarshaniService');
        this.apiService.getHttp().subscribe({
          next: ((res: any) => {
            if (res?.statusCode == 200) {
              this.commonService.matSnackBar(res?.statusMessage, 0);
              this.resetForm('Yes');
            }
            else {
              this.commonService.checkDataType(res?.statusMessage) == false ? this.errorService.handleError(res?.statusCode) : this.commonService.matSnackBar(res?.statusMessage, 1);
            }
          }),
          error: (error: any) => {
            this.errorService.handleError(error.status);
          }
        })
    }
  }

  resetForm(flag?:any){
    this.formDirective && this.formDirective.resetForm();
    this.commonService.routerLinkRedirect('/visit-entry-list');
  }
}