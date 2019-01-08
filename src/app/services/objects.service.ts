import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SessionService } from '@app/services/session.service';
import { map, tap } from 'rxjs/operators';

/**
 * NetXMS object class identifiers
 */
export enum ObjectClassId {
   GENERIC               = 0,
   SUBNET                = 1,
   NODE                  = 2,
   INTERFACE             = 3,
   NETWORK               = 4,
   CONTAINER             = 5,
   ZONE                  = 6,
   SERVICEROOT           = 7,
   TEMPLATE              = 8,
   TEMPLATEGROUP         = 9,
   TEMPLATEROOT          = 10,
   NETWORKSERVICE        = 11,
   VPNCONNECTOR          = 12,
   CONDITION             = 13,
   CLUSTER               = 14,
   POLICYGROUP           = 15,
   POLICYROOT            = 16,
   AGENTPOLICY           = 17,
   AGENTPOLICY_CONFIG    = 18,
   NETWORKMAPROOT        = 19,
   NETWORKMAPGROUP       = 20,
   NETWORKMAP            = 21,
   DASHBOARDROOT         = 22,
   DASHBOARD             = 23,
   BUSINESSSERVICEROOT   = 27,
   BUSINESSSERVICE       = 28,
   NODELINK              = 29,
   SLMCHECK              = 30,
   MOBILEDEVICE          = 31,
   RACK                  = 32,
   ACCESSPOINT           = 33,
   AGENTPOLICY_LOGPARSER = 34,
   CHASSIS               = 35,
   DASHBOARDGROUP        = 36,
   SENSOR                = 37
}

/**
 * NetXMS object data as received from server
 */
class NetObjData {
   objectId: number;
   guid: string;
   objectClass: number;
   objectName: string;
   status: string;
   parents: number[];
   children: number[];
}

class ObjectResponse {
   objects: NetObjData[];
}

/**
 * NetXMS object
 */
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

   constructor(data: NetObjData) {
      this.objectId = data.objectId;
      this.guid = data.guid;
      this.objectClass = data.objectClass;
      this.objectName = data.objectName;
      this.status = data.status;
      this.parents = data.parents;
      this.children = data.children;
      this.expandable = (this.children.length > 0);

      switch (this.objectClass) {
         case ObjectClassId.ACCESSPOINT:
            this.icon = 'wifi';
            break;
         case ObjectClassId.CONTAINER:
            this.icon = 'folder';
            break;
         case ObjectClassId.NODE:
            this.icon = 'host';
            break;
         case ObjectClassId.RACK:
            this.icon = 'rack-server';
            break;
         case ObjectClassId.SUBNET:
            this.icon = 'cloud-network';
            break;
         default:
            this.icon = 'block';
      }
   }
}

/**
 * Service for object management
 */
@Injectable({
   providedIn: 'root'
})
export class ObjectsService {
   private objects: Map<number, NetObj> = null;

   constructor(
      private http: HttpClient,
      private sessionService: SessionService
   ) { }

   private objectsFromObjectData(data: NetObjData[]): NetObj[] {
      const objects: NetObj[] = [];
      data.forEach(d => { objects.push(new NetObj(d)); });
      return objects;
   }

   private createObjectCache(objects: NetObj[]): void {
      this.objects = new Map<number, NetObj>();
      objects.forEach(o => { this.objects.set(o.objectId, o); });
   }

   getRootObjects(classFilter: string): Observable<NetObj[]> {
      console.log('Called ObjectService.getRootObjects("' + classFilter + '")');
      return this.http
         .get<ObjectResponse>(this.sessionService.getApiBaseUrl() + '/objects?topLevelOnly=true&class=' + classFilter)
         .pipe(tap(result => { console.log('object response: ' + JSON.stringify(result)); }))
         .pipe(map(result => this.objectsFromObjectData(result.objects)));
   }

   getAllObjects(): Observable<NetObj[]> {
      if (this.objects) {
         return of(Array.from(this.objects.values()));
      }
      return this.http
         .get<ObjectResponse>(this.sessionService.getApiBaseUrl() + '/objects')
         .pipe(map(result => this.objectsFromObjectData(result.objects)))
         .pipe(tap((objects: NetObj[]) => { this.createObjectCache(objects); }));
   }

   getObject(id: number): Observable<NetObj> {
      if (this.objects) {
         return of(this.objects.get(id));
      }
      return this.http
         .get<ObjectResponse>(this.sessionService.getApiBaseUrl() + '/objects')
         .pipe(map(result => this.objectsFromObjectData(result.objects)))
         .pipe(tap((objects: NetObj[]) => { this.createObjectCache(objects); }))
         .pipe(map(result => this.objects.get(id)));
   }

   private getObjectSetInternal(idList: number[], skipUnknown: boolean): NetObj[] {
      const objects: NetObj[] = [];
      idList.forEach(id => {
         const o = this.objects.get(id);
         if ((o != null) || !skipUnknown) {
            objects.push(o);
         }
      });
      return objects;
   }

   getObjectSet(idList: number[], skipUnknown: boolean): Observable<NetObj[]> {
      if (this.objects) {
         return of(this.getObjectSetInternal(idList, skipUnknown));
      }
      return this.http
         .get<ObjectResponse>(this.sessionService.getApiBaseUrl() + '/objects')
         .pipe(map(result => this.objectsFromObjectData(result.objects)))
         .pipe(tap((objects: NetObj[]) => { this.createObjectCache(objects); }))
         .pipe(map(result => this.getObjectSetInternal(idList, skipUnknown)));
   }
}
