import OrderItem from "./orderItem";

describe('Order Item unit test',()=>{
    
    it("should throw error when Id is empty",()=>{
        expect(() =>{
            let orderItem = new OrderItem("","Item",330, "p1", 10);
        }).toThrowError("Id is required");
    });

    it("should throw error when Name is empty",()=>{
        expect(() =>{
            let orderItem = new OrderItem("123","",330, "p1", 10);
        }).toThrowError("Name is required");
    });

    it("should throw error when Price is 0",()=>{
        expect(() =>{
            let orderItem = new OrderItem("123","Item 1",0, "p1", 10);
        }).toThrowError("Price is required");
    });

    it("should throw error when Price is less than 0",()=>{
        expect(() =>{
            let orderItem = new OrderItem("123","Item 1",-2, "p1", 10);
        }).toThrowError("Price is required");
    });

    it("should change name",()=>{
        let orderItem = new OrderItem("123","Item 1",10, "p1", 10);
        orderItem.changeName("Item A");
        expect(orderItem.Name).toBe("Item A");
    });

    it("should change value",()=>{
        let orderItem = new OrderItem("123","Item 1",10, "p1", 10);
        orderItem.changePrice(15);
        expect(orderItem.Price).toBe(150);
    });

    it("should throw error when Price is less than 0",()=>{
        expect(() =>{
            let orderItem = new OrderItem("123","Item 1",10, "p1", 10);
            orderItem.changePrice(-2);
        }).toThrowError("Price is required");
    });

    it("should throw error when Quantity is less than 0",()=>{
        expect(() =>{
            let orderItem = new OrderItem("123","Item 1",10, "p1", -10);
        }).toThrowError("Quantity is required");
    });
});