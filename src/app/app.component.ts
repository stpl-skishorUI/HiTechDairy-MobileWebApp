import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = this.configService.title;

  constructor(private router: Router, private Title: Title, private activatedRoute: ActivatedRoute, private configService: ConfigService) {
    this.setTabTitle();
    this.scrollTop();
  }





  setTabTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),  // set title dynamic
    ).subscribe(() => {
      var rt = this.checkActivatedRoute(this.activatedRoute);
      let titleName = rt?.data?._value?.breadcrumb[rt.data?._value?.breadcrumb?.length - 1]?.title;
      rt.data.subscribe(() => {
        this.Title.setTitle(titleName)
      })
    });
  }

  checkActivatedRoute(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.checkActivatedRoute(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  scrollTop() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }
}
