import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CommonMethodsService } from './common-methods.service';
import { ErrorService } from './error.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private apiService: ApiService, 
    private commonService: CommonMethodsService, 
    private error: ErrorService,
    private configService: ConfigService) { }

  uploadDocuments(event: any, folderName?: any, allowedDocTypes?: any, _minsize?: any, _maxsize?: any) {
    return new Observable(obj => {
      const selResult = event.target.value.split('.');
      const docExt = selResult.pop();
      docExt.toLowerCase();
      if (allowedDocTypes.match(docExt.toLowerCase())) {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          // if (file.size > 10485760) {
          //   obj.error("Required file size should be less than " + 10 + " MB.");
          //   this.commonService.matSnackBar("Required file size should be less than " + 10 + " MB.", 1);
          // }
          // else {
            const reader: any = new FileReader();
            reader.onload = () => {
              const formData = new FormData();
              if(folderName !='HitechDairyDocs'){
                formData.append('FolderName', folderName);
                formData.append('DocumentType', docExt);
                formData.append('UploadDocPath', file);
              }else{
              formData.append('file', file);
              }
              const url = folderName =='HitechDairyDocs' ? 'api/Documents/upload-document-details?appId=' + this.configService?.appId:'HiTechDairy/documents/UplodFile'
              this.apiService.setHttp('post', url, false, formData, false, (folderName =='HitechDairyDocs'?'hrmsDairyService':'priyadarshaniService'));
              this.apiService.getHttp().subscribe({
                next: (res: any) => {
                  if (res.statusCode == "200") {
                    obj.next(res);
                  }
                  else {
                    this.commonService.checkDataType(res.statusMessage) == false ? this.error.handleError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
                  }
                },
                error: ((error: any) => {
                  this.error.handleError(error.status);
                })
              })
            }
            reader.readAsDataURL(event.target.files[0]);
          }
        // }
      }
      else {
        obj.next('error');
        obj.error("Only " + allowedDocTypes + " file format allowed.");
        this.commonService.matSnackBar("Only " + allowedDocTypes + " file format allowed.", 1)
      }
    })
  }
}
