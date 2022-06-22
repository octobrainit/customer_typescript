import EventHandlerInterface from '../../@shared/event.handler.interface';
import ProductCreatedEvent from '../productCreated.event';

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending Email to ${event.eventData.email}`);
    }
}
