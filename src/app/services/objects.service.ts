import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { SessionService } from '@app/services/session.service';

export class NetObj {
   objectId: number;
   guid: string;
   objectClass: number;
   objectName: string;
   status: string;
   parents: number[];
   children: number[];
}

class ObjectResponse {
   objects: NetObj[];
}

/**
 * Service for object management
 */
@Injectable({
   providedIn: 'root'
})
export class ObjectsService {
   private activeObjectSet$ = new ReplaySubject<NetObj[]>(1);

   constructor(
      private http: HttpClient,
      private sessionService: SessionService
   ) { }

   getRootObjects(classFilter: string): Observable<NetObj[]> {
      console.log('>>> get root objects');
      this.http.get<ObjectResponse>(this.sessionService.getApiBaseUrl() + '/api/objects?topLevelOnly=true&class=' + classFilter)
         .subscribe(
            (data: ObjectResponse) => {
               console.log('getObjects done');
               this.activeObjectSet$.next(data.objects);
               this.activeObjectSet$.complete();
            },
            error => {
               console.log('getObjects error');
               this.activeObjectSet$.error(error);
            }
         );
      return this.activeObjectSet$.asObservable();
   }
}
