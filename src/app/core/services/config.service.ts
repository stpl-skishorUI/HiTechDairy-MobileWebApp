import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  title :string =  'Project Name';
  
  //For HRMS API - Start Here
  appId = 1;
  isExternal = true;
  //For HRMS API - End Here

  static googleApiObj: object = {
    apiKey: 'AIzaSyAkNBALkBX7trFQFCrcHO2I85Re2MmzTo8',
    language: 'en',
    libraries: ['places', 'geometry'],
  };

  constructor() { }
}
