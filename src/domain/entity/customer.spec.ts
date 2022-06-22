import EventDispatcher from '../event/@shared/event.dispatcher';
import CustomerCreatedEvent from '../event/customer/customerCreated.event';
import { Address } from '../vo/address';
import { Customer } from './cutomer';
import CustomerCreatedEventHandler1 from '../event/customer/handler/customerCreadedEvent1.handler';
import CustomerChangedAddressEvent from '../event/customer/customerChangedAddress.event';
import CustomerCreatedEventHandler2 from '../event/customer/handler/customerCreadteEvent2.handler';

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

    it('should notify events when user created and address is changed', () =>{
        const eventDispatcher = new EventDispatcher();
        const userCreatedEventHandler = new CustomerCreatedEventHandler1() ;
        const spyEventHandler = jest.spyOn(userCreatedEventHandler, "handle");
       
        eventDispatcher.register('CustomerCreatedEvent', userCreatedEventHandler);
        
        eventDispatcher.notify(new CustomerCreatedEvent({}));

        expect(spyEventHandler).toHaveBeenCalled();
        
        const userCreatedEventHandler1 = new CustomerCreatedEventHandler2() ;
        eventDispatcher.register('CustomerChangedAddressEvent', userCreatedEventHandler1)
        const spyEventHandler1 = jest.spyOn(userCreatedEventHandler1, "handle");
        
        eventDispatcher.notify(new CustomerChangedAddressEvent({
            id: '1',
            name: 'BIRRRRR', 
            address: 'Endereço'
        }))

        expect(spyEventHandler1).toHaveBeenCalled();

    });
});