import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NetObj, ObjectsService } from '@app/services/objects.service';

@Component({
   selector: 'nx-object-tree',
   templateUrl: './object-tree.component.html',
   styleUrls: ['./object-tree.component.css']
})
export class ObjectTreeComponent implements OnInit {
   @Input('root-classes') rootClasses: string;

   constructor(private objectService: ObjectsService) { }

   ngOnInit() {
   }

   getRootObjects(): Observable<NetObj[]> {
      console.log('>>> get root');
      return this.objectService.getRootObjects(this.rootClasses);
   }

   getChildren(parent: NetObj): NetObj[] {
      console.log('>>> get children for ' + parent.objectName);
      return null;
   }
}
