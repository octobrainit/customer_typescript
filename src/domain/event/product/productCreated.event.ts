import EventInterface from '../@shared/event.interface';

export default class ProductCreatedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any, dataTimeOcurred: Date = new Date()) {
        this.dataTimeOcurred = dataTimeOcurred;
        this.eventData = eventData;
    }
}
