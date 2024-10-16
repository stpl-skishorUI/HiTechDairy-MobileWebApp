import { Injectable } from '@angular/core';
import { CommonMethodService } from './common-method.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {
  userId!: number;
  userName!: string;
  selLanguage = new BehaviorSubject('English');
  constructor(private commonMethodService: CommonMethodService) { }

  userIsLoggedIn() {
    if (localStorage.getItem('projectName')) {
      return true
    } else {
      return false
    }
  }


}
