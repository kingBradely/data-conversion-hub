import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SubMenuItem } from '../../../../../core/models/menu.model';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'div[navbar-submenu]',
  standalone: false,
  templateUrl: './navbar-submenu.component.html',
  styleUrl: './navbar-submenu.component.css',
})
export class NavbarSubmenuComponent {
  @Input() public submenu = <SubMenuItem[]>{};
  @ViewChild('submenuRef') submenuRef: ElementRef<HTMLDivElement> | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    /**
     * check if component is out of the screen
     */
    if (this.submenuRef) {
      const submenu = this.submenuRef.nativeElement.getBoundingClientRect();
      const bounding = document.body.getBoundingClientRect();

      if (submenu.right > bounding.right) {
        const childrenElement = this.submenuRef.nativeElement.parentNode as HTMLElement;
        if (childrenElement) {
          childrenElement.style.left = '-100%';
        }
      }
    }
  }
}
