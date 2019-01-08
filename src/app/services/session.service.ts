import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';

/**
 * Connected NetXMS server information
 */
export interface ServerInfo {
   address: string;
   version: string;
   color: string;
   id: number;
   timeZone: string;
}

/**
 * Logged in user information
 */
export interface UserInfo {
   name: string;
   id: number;
   globalAccessRights: number;
}

/**
 * Session information
 */
export interface Session {
   server: ServerInfo;
   user: UserInfo;
   encrypted: boolean;
   objectsSynchronized: boolean;
   passwordExpired: boolean;
   zoningEnabled: boolean;
}

/**
 * Session handle interface
 */
export interface SessionHandle {
   sessionHandle: string;
   session: Session;
}

/**
 * Session service
 */
@Injectable({
   providedIn: 'root'
})
export class SessionService {
   private sessionHandle: SessionHandle;
   private error: HttpErrorResponse;

   constructor(private http: HttpClient) {
      this.sessionHandle = JSON.parse(sessionStorage.getItem('sessionObject'));
      if (this.sessionHandle) {
         console.log('Attached to existing session handle');
      }
      console.log('SessionService created');
   }

   /**
    * Login to NetXMS server.
    *
    * @param username login name
    * @param password password
    */
   login(username: string, password: string): Observable<SessionHandle> {
      this.sessionHandle = null;
      this.error = null;
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('sessionObject');

      return this.http.post<SessionHandle>(this.getApiBaseUrl() + '/sessions',
            JSON.stringify({ 'login': username, 'password': password }))
         .pipe(tap(
            (h: SessionHandle) => {
               console.log('Logged in as ' + h.sessionHandle);
               sessionStorage.setItem('sessionToken', h.sessionHandle);
               sessionStorage.setItem('sessionObject', JSON.stringify(h));
               this.sessionHandle = h;
            },
            (e: HttpErrorResponse) => {
               console.log('Login failed: ' + e.status + ' ' + e.message);
               this.error = e;
            }));
   }

   /**
    * Logout from NetXMS server.
    */
   logout() {
      this.sessionHandle = null;
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('sessionObject');
   }

   /**
    * Get information about current session
    */
   getSession(): Session {
      return (this.sessionHandle != null) ? this.sessionHandle.session : null;
   }

   /**
    * Get information about logged in user
    */
   getLoggedInUserInfo(): UserInfo {
      return (this.sessionHandle != null) ? this.sessionHandle.session.user : null;
   }

   /**
    * Get description for login error
    */
   getErrorDescription(): string {
      return (this.error) ? this.error.statusText : 'Success';
   }

   /**
    * Get base URL for API calls
    */
   getApiBaseUrl(): string {
      return '/api';
   }
}
