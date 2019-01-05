import { Injectable } from '@angular/core';

/**
 * Possible severity values for applicaion alerts
 */
export enum AppAlertSeverity {
   ERROR = 'danger',
   INFO = 'info',
   SUCCESS = 'success',
   WARNING = 'warning'
}

/**
 * Application alert
 */
@Injectable({
   providedIn: 'root'
})
export class AppAlert {
   public id: number;
   public severity: string;
   public key: string;
   public message: string;

   constructor(id: number, severity: AppAlertSeverity, key: string, message: string) {
      this.id = id;
      this.severity = severity;
      this.key = key;
      this.message = message;
   }
}

/**
 * Service that manage application level alerts
 */
@Injectable({
  providedIn: 'root'
})
export class AppAlertService {
   private alerts: AppAlert[] = [];
   private nextId = 1;

  constructor() { }

   /**
    * Add new application alert
    *
    * @param severity alert severity
    * @param message alert message
    */
   addAlert(severity: AppAlertSeverity, key: string, message: string) {
      if (key != null) {
         for (let i = 0; i < this.alerts.length; i++) {
            if (this.alerts[i].key === key) {
               this.alerts[i].severity = severity;
               this.alerts[i].message = message;
               return;
            }
         }
      }
      this.alerts.push(new AppAlert(this.nextId++, severity, key, message));
   }

   /**
    * Remove application alert with given ID
    *
    * @param id ID of application alert to remove
    */
   removeAlert(id: number) {
      this.alerts = this.alerts.filter((e) => {
         return (e.id !== id);
      });
   }

   /**
    * Get all acrive application alerts
    */
   getAllAlerts(): AppAlert[] {
      return this.alerts;
   }
}
