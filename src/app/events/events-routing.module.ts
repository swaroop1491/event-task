import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPOENTNS
import { EventListingComponent } from './event-listing/event-listing.component';
import { EventBookingComponent } from './event-booking/event-booking.component';

const routes: Routes = [
    { path: 'events', component: EventListingComponent },
    { path: 'book-event/:id', component: EventBookingComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class EventsRoutingModule {}
