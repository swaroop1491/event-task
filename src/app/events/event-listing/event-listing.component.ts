import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// PROVIDERS
import { EventsProviderService } from '../events-provider.service';

// MODELS
import { Event } from '../event.model';

@Component({
    selector: 'app-event-listing',
    templateUrl: './event-listing.component.html',
    styleUrls: [ './event-listing.component.scss' ]
})
export class EventListingComponent implements OnInit {
    public eventData: Array<Event>;
    public eventDataList: Array<Event>;
    public searchTerm: FormControl = new FormControl('');

    constructor(private router: Router, private eventsProviderService: EventsProviderService) {}

    ngOnInit() {
        this.eventData = [];
        this.eventDataList = [];

        this.eventsProviderService.getEventsData().subscribe(
            (eventData: Array<Event>) => {
                this.eventData = eventData;
                this.eventDataList = eventData;
            },
            (error) => {
                console.log(error.error);
            }
        );

        this.searchTerm.valueChanges.subscribe((searchTerm: string) => {
            this.eventDataList = this.eventData.filter((event: Event) => {
                return event.eventName.toLowerCase().startsWith(searchTerm.trim().toLowerCase());
            });
        });
    }

    public bookNow(eventIndex: number) {
        this.router.navigate([ 'book-event', eventIndex ]);
    }
}
