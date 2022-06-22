import EventInterface from './event.interface';

export default interface EventHandlerInterface<TRecieve extends EventInterface = EventInterface> {
    handle(event: TRecieve): void; 
}