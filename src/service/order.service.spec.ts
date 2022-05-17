import { Order } from '../entity/order';
import OrderItem from '../entity/orderItem';
import OrderService from './order.service';
import { Customer } from '../entity/cutomer';

describe('OrderService unit test',() =>{
    
    it('should get total of all orders',()=>{
       const orderItem = new OrderItem('1','item1',100,'p1',1);
       const orderItem2 = new OrderItem('2','item2',100,'p2',2);
       const order = new Order('1','1',[orderItem]);
       const order2 = new Order('2','2',[orderItem2]);
       const total = OrderService.total([order, order2]);

       expect(total).toBe(300);
       
    });

    it('should place an order',()=>{
        const customer = new Customer("1","customer 1");
        const item1 = new OrderItem("i1","item 1",10,"p1",1);
        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.RewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });
});