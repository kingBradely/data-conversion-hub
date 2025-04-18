import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Menu } from '../../../core/constants/menu';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MenuItem, SubMenuItem } from '../../../core/models/menu.model';

@Component({
  selector: 'app-page-headline',
  standalone: true,
  templateUrl: './page-headline.component.html',
  styleUrl: './page-headline.component.css'
})
export class PageHeadlineComponent implements OnInit, OnDestroy {
  
  title: string = '';
  description: string = '';
  currentRoute: string;
  pageInfo: SubMenuItem = {
    label: '',
    route: '',
    title: '',
    description: ''
  };
  private routerSubscription = new Subscription;

  constructor(private router: Router) { 
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.updatePageInfo();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      this.updatePageInfo();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  updatePageInfo(): void {
    const foundMenuItem = Menu.findByRoute(this.currentRoute);
    this.pageInfo = foundMenuItem || {
      label: '',
      route: '',
      title: '',
      description: ''
    };
  }
}
