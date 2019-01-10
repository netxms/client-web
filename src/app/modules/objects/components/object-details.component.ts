import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NetObj, ObjectsService } from '@app/services/objects.service';

@Component({
   selector: 'app-object-details',
   templateUrl: './object-details.component.html',
   styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {
   object: NetObj;

   private objectId: number;
   private subscription: Subscription;

   constructor(private route: ActivatedRoute, private objectService: ObjectsService) { }

   ngOnInit() {
      this.subscription = this.route.params.subscribe(params => {
         this.objectId = +params['objectId'];
         this.object = null;
         const s = this.objectService.getObject(this.objectId).subscribe(object => {
            this.object = object;
            s.unsubscribe();
         })
      });
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}
