import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { EventListingComponent } from './events/event-listing/event-listing.component';
import { EventBookingComponent } from './events/event-booking/event-booking.component';

const routes: Routes = [
    { path: 'events', component: EventListingComponent },
    { path: 'book-event', component: EventBookingComponent },
    { path: '', redirectTo: 'events', pathMatch: 'full' },
    { path: '**', redirectTo: 'events' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
