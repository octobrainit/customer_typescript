import { Customer } from "../entity/cutomer";
import { Order } from "../entity/order";
import OrderItem from '../entity/orderItem';
import { v4 as uuid } from "uuid";

export default class OrderService {
    
    static total(items: Order[]): number {
        return items.reduce((acumulator,item) => acumulator + item.total(),0)    
    }
    
    static  placeOrder(customer: Customer, orderItems: OrderItem[]) : Order{
        if(orderItems.length === 0)
            throw new Error('Order must have at least one item');
        
        var order = new Order(uuid(),customer.Id, orderItems);
        customer.addRewardPoints((order.total()/2));
        
        return order;
    }
}