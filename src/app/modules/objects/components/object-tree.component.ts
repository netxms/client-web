import { Component, OnInit, Input } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NetObj, ObjectsService } from '@app/services/objects.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'nx-object-tree',
   templateUrl: './object-tree.component.html',
   styleUrls: ['./object-tree.component.css']
})
export class ObjectTreeComponent implements OnInit {
   @Input('root-classes') rootClasses: string;

   rootObjects$: Observable<NetObj[]>;
   rootObjects: NetObj[];
   error: any = null;

   constructor(private objectService: ObjectsService) { }

   ngOnInit() {
      this.rootObjects$ = this.getRootObjects();
   }

   getRootObjects(): Observable<NetObj[]> {
      console.log('getRootObjects');
      this.error = null;
      return this.objectService
         .getRootObjects(this.rootClasses)
         .pipe(catchError(
            (e: HttpErrorResponse) => {
               this.error = e;
               console.log('Error in getRootObjects: ' + e.message);
               return throwError(e);
            }
         ));
   }

   getChildren(parent: NetObj): NetObj[] {
      this.error = null;
      console.log('>>> get children for ' + parent.objectName);
      return [];
   }
}
