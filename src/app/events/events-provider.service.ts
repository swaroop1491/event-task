import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RxJs
import { throwError, Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

// MODELS
import { Event } from './event.model';

@Injectable({
    providedIn: 'root'
})
export class EventsProviderService {
    private readonly eventsDataURL = 'assets/event-data.json';

    constructor(private httpClient: HttpClient) {}

    public getEventsData() {
        return this.httpClient.get<Array<Event>>(this.eventsDataURL).pipe(catchError(this.handleResponse));
    }

    public getEventDetails(index: number) {
        return this.httpClient.get<Array<Event>>(this.eventsDataURL).pipe(
            map((eventData: Array<Event>) => {
                return eventData[index];
            }),
            catchError(this.handleResponse)
        );
    }

    protected handleResponse(data: Response | any): any {
        if (data) {
            const body = data.json();
            if (!body || body.error) {
                return throwError('somthing went wrong. please try again later.');
            }
            return body;
        } else {
            return throwError('somthing went wrong. please try again later.');
        }
    }
}
