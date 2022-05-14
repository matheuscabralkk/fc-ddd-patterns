import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreated2Event from '../customer-created-2.event';

export default class LogWhenCustomerCreated2
    implements EventHandlerInterface<CustomerCreated2Event> {
    handle(event: CustomerCreated2Event): void {
        // tslint:disable-next-line:no-console
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}
