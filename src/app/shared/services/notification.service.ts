import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationConfig {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  title?: string;
}

export interface NotificationData extends NotificationConfig {
  id: number;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationData>();
  private counter = 0;
  notifications$ = this.notificationSubject.asObservable();

  show(config: NotificationConfig): void {
    const id = this.counter++;
    const notification: NotificationData = {
      id,
      visible: true,
      duration: config.duration || 7000,
      position: config.position || 'bottom-center',
      ...config
    };

    this.notificationSubject.next(notification);

    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.hide(id);
      }, notification.duration);
    }
  }

  hide(id: number): void {
    this.notificationSubject.next({
      id,
      visible: false,
      message: '',
      type: 'info'
    });
  }

  success(message: string, title?: string): void {
    this.show({ message, type: 'success', title });
  }

  error(message: string, title?: string): void {
    console.log("zzzzzzzzzzz");
    
    this.show({ message, type: 'error', title });
  }

  warning(message: string, title?: string): void {
    this.show({ message, type: 'warning', title });
  }

  info(message: string, title?: string): void {
    this.show({ message, type: 'info', title });
  }
}