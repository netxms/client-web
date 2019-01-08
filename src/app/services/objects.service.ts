import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SessionService } from '@app/services/session.service';
import { map, tap } from 'rxjs/operators';

export class NetObj {
   objectId: number;
   guid: string;
   objectClass: number;
   objectName: string;
   status: string;
   parents: number[];
   children: number[];

   // UI only attributes
   icon: string;
   expandable: boolean;
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
   private objects = null;

   constructor(
      private http: HttpClient,
      private sessionService: SessionService
   ) { }

   getRootObjects(classFilter: string): Observable<NetObj[]> {
      console.log('Called ObjectService.getRootObjects("' + classFilter + '")');
      return this.http
            .get<ObjectResponse>(this.sessionService.getApiBaseUrl() + '/objects?topLevelOnly=true&class=' + classFilter)
            .pipe(tap(result => { console.log('object response: ' + JSON.stringify(result)) }))
            .pipe(map(result => result.objects))
            .pipe(tap((objects: NetObj[]) => {
               objects.forEach(object => { object.icon = 'cog'; object.expandable = (object.children.length > 0); });
            }));
   }

   getAllObjects(): Observable<NetObj[]> {
      return this.http
            .get<ObjectResponse>(this.sessionService.getApiBaseUrl() + '/objects')
            .pipe(map(result => result.objects))
            .pipe(tap((objects: NetObj[]) => {
               objects.forEach(object => { object.icon = 'cog'; object.expandable = (object.children.length > 0); });
            }));
   }

   getObject(id: number): Observable<NetObj> {
      if (this.objects) {
         return of(this.objects[id]);
      }
      return
   }
}
