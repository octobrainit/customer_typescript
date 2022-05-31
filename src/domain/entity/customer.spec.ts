import { Address } from '../vo/address';
import { Customer } from './cutomer';

describe("Customer unit tests",() =>{
    
    it("should throw error when id is empty",()=>{
        expect(() =>{
            let customer = new Customer("","John");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty",()=>{
        expect(() =>{
            let customer = new Customer("123","");
        }).toThrowError("Name is required");
    });

    it("should throw error when name changed is empty",()=>{
        expect(() =>{
            let customer = new Customer("123","Anderson");
            customer.changeName("");
        }).toThrowError("Name is required");
    });

    it("should change name",()=>{
        let customer = new Customer("123","Anderson");
        customer.changeName("Murilo");
        expect(customer.Name).toBe("Murilo");
    });

    it("should Activate customer",()=>{
        let customer = new Customer("123","Anderson");
        customer.changeAddress(new Address('victorio',831,'15995222','matão'));
        
        expect(customer.IsActive).toBe(true);
    });

    it("should throw error when Activate customer without address",()=>{
        expect(() =>{
            let customer = new Customer("123","Anderson");
            customer.activate();
        }).toThrowError("Address is required to activate customer");
    });

    it("should deactivate customer",()=>{
        let customer = new Customer("123","Anderson");
        customer.deactivate()
        
        expect(customer.IsActive).toBe(false);
    });

    it("should change rewardPoints customer",()=>{
        let customer = new Customer("123","Anderson");
        
        expect(customer.RewardPoints).toBe(0);

        customer.addRewardPoints(5);
        
        expect(customer.RewardPoints).toBe(5);
    });
});