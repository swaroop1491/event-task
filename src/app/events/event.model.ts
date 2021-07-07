export class Event {
    constructor(
        public eventName: string,
        public imageUrl: string,
        public eventDate: Date,
        public seatsAvailable: number
    ) {}
}
