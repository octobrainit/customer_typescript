import EventInterface from '../@shared/event.interface';

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any = {}, dataTimeOcurred: Date = new Date()){
        this.eventData = eventData;
        this.dataTimeOcurred = dataTimeOcurred;
    }
} 