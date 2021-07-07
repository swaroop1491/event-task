import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

// PROVIDERS
import { EventsProviderService } from '../events-provider.service';

// MODELS
import { Event } from '../event.model';

@Component({
    selector: 'app-event-booking',
    templateUrl: './event-booking.component.html',
    styleUrls: [ './event-booking.component.scss' ]
})
export class EventBookingComponent implements OnInit {
    public eventDetails: Event;
    public eventIndex: number;
    public numberOfSeatsOptions: Array<number> = [ 1, 2, 3, 4, 5, 6 ];
    public formSubmitted = false;
    public bookingForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventsProviderService: EventsProviderService
    ) {
        this.initForm();

        this.bookingForm.controls.numberOfSeats.valueChanges.subscribe((noOfAttendees: number) => {
            if (noOfAttendees > 0) {
                this.addAttendee(noOfAttendees);
            }
        });
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.eventIndex = +params.id;
            this.eventsProviderService.getEventDetails(this.eventIndex).subscribe((eventDetails: Event) => {
                this.eventDetails = eventDetails;

                this.bookingForm.get('numberOfSeats').setValidators(Validators.max(this.eventDetails.seatsAvailable));
            });
        });
    }

    private initForm() {
        this.bookingForm = new FormGroup({
            userName: new FormControl('', [ Validators.required, Validators.pattern(/^[\sa-zA-Z]+$/) ]),
            email: new FormControl('', [ Validators.required, Validators.email ]),
            phoneNumber: new FormControl('', [ Validators.pattern(/^[\d]{10}$/) ]),
            numberOfSeats: new FormControl('', [ Validators.required ]),
            namesOfAttendees: new FormArray([
                new FormGroup({
                    name: new FormControl('', [ Validators.required ])
                })
            ])
        });
    }

    public addAttendee(numberOfAttendees: number) {
        const attendeesFormArray: FormArray = this.getAttendeesFormArray();

        while (attendeesFormArray.length > numberOfAttendees) {
            attendeesFormArray.removeAt(attendeesFormArray.length - 1);
        }

        while (attendeesFormArray.length < Math.min(numberOfAttendees, this.eventDetails.seatsAvailable)) {
            attendeesFormArray.push(
                new FormGroup({
                    name: new FormControl('', [ Validators.required ])
                })
            );
        }
    }

    public getAttendeesFormArray(): FormArray {
        return this.bookingForm.get('namesOfAttendees') as FormArray;
    }

    public cancelBooking() {
        this.router.navigate([ 'events' ]);
    }

    public submitBookingDetails() {
        this.bookingForm.markAllAsTouched();

        if (this.bookingForm.valid) {
            this.formSubmitted = true;
            console.log(this.bookingForm.value);
        }
    }

    public getAttendees(): string {
        let attendees = '';

        this.bookingForm.value.namesOfAttendees.forEach((namesObject: { name: string }) => {
            attendees += namesObject.name + ', ';
        });

        return attendees.slice(0, -2);
    }
}
