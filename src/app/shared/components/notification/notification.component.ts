import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, NotificationData } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { AngularSvgIconModule, SvgIconComponent } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification',
  imports: [
    CommonModule,
    SvgIconComponent,
    AngularSvgIconModule,
    BrowserAnimationsModule
  ],
  template: `
    <div class="fixed z-50 w-full flex justify-center" [ngClass]="getPositionClasses()">
      <div class="space-y-2 w-full max-w-sm px-4">
        @for (notification of notifications; track notification.id) {
          @if (notification.visible) {
            <div
              class="bg-background border-border text-foreground flex w-full items-start gap-2 rounded-lg border p-4 shadow-lg transition-all duration-300"
              [ngClass]="getNotificationTypeClasses(notification)"
              @fadeSlide>
              <div class="flex-shrink-0">
                <svg-icon
                  [src]="getNotificationIcon(notification)"
                  [svgClass]="'h-5 w-5 ' + getIconColorClass(notification)">
                </svg-icon>
              </div>
              <div class="flex-1 pt-[1px]">
                @if (notification.title) {
                  <p class="text-sm font-medium">{{ notification.title }}</p>
                }
                <p class="text-muted-foreground mt-1 text-sm">{{ notification.message }}</p>
              </div>
              <button
                (click)="closeNotification(notification.id)"
                class="text-foreground/50 hover:text-foreground flex-shrink-0 rounded-lg p-1 transition-colors duration-200">
                <svg-icon src="assets/icons/heroicons/outline/close-x-svgrepo-com.svg" [svgClass]="'h-5 w-5'"></svg-icon>
              </button>
            </div>
          }
        }
      </div>
    </div>
  `,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-40px)' }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: NotificationData[] = [];
  private subscription = new Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(notification => {
      if (notification.visible) {
        this.notifications.push(notification);
      } else {
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closeNotification(id: number): void {
    this.notificationService.hide(id);
  }

  getPositionClasses(): string {
    const positions = {
      'top-right': 'top-16 right-4',
      'top-left': 'top-16 left-4',
      'bottom-right': 'bottom-16 right-4',
      'bottom-left': 'bottom-16 left-4',
      'top-center': 'top-16 inset-x-0 mx-auto',
      'bottom-center': 'bottom-16 inset-x-0 mx-auto'
    };
    const position = this.notifications.length > 0 ? this.notifications[0].position : 'bottom-center';
    return positions[position || 'bottom-center'];
  }

  getNotificationTypeClasses(notification: NotificationData): string {
    const classes = {
      success: 'border-green-500/30 bg-green-500/10',
      error: 'border-red-500/30 bg-red-500/10',
      warning: 'border-yellow-500/30 bg-yellow-500/10',
      info: 'border-blue-500/30 bg-blue-500/10'
    };
    return classes[notification.type];
  }

  getIconColorClass(notification: NotificationData): string {
    const classes = {
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500'
    };
    return classes[notification.type];
  }

  getNotificationIcon(notification: NotificationData): string {
    const icons = {
      success: 'assets/icons/heroicons/outline/check-circle-svgrepo-com.svg.svg',
      error: 'assets/icons/heroicons/outline/error-16-svgrepo-com.svg',
      warning: 'assets/icons/heroicons/outline/error-16-svgrepo-com.svg',
      info: 'assets/icons/heroicons/outline/info-circle-svgrepo-com.svg'
    };
    return icons[notification.type];
  }
}