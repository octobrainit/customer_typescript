import { Order } from './order';
import OrderItem from './orderItem';

describe('Order unit test',()=>{
    
    it("should throw error when Id is empty",()=>{
        expect(() =>{
            let order = new Order("","123",[]);
        }).toThrowError("Id is required");
    });

    it("should throw error when CustomerId is empty",()=>{
        expect(() =>{
            let order = new Order("123","",[]);
        }).toThrowError("Id is required");
    });

    it("should throw error when Order items is empty",()=>{
        expect(() =>{
            let order = new Order("123","123", []);
        }).toThrowError("Order require one or more Order Items");
    });

    it("should create Order",()=>{
        let order = new Order("123","123", [new OrderItem("1","item 1",30,"p1",2)]);
        expect(order).toBeInstanceOf(Order);
    });

    it("should calculate total",()=>{
        let order = new Order("123","123", [new OrderItem("1","item 1",30,"p1",3),new OrderItem("1","item 1",30,"p2",2)]);
        let total = order.total();
        expect(total).toBe(150);
    });

});