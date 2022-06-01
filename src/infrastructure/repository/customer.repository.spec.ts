import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';
import { Customer } from '../../domain/entity/cutomer';
import { Address } from '../../domain/vo/address';

describe('Customer unit test', ()=>{
    let sequilize: Sequelize;

    beforeEach(async () =>{
        
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        sequilize.addModels([
            CustomerModel
        ]);

        await sequilize.sync();
    });
    
    afterEach( async () =>{
        await sequilize.close();
    });

    it("should create a customer", async() =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1','Product 1');
        const address = new Address('street 1',831,'15995222','josuá');
        customer.changeAddress(address);

        await customerRepository.create(customer);
        
        const customerCreated = await CustomerModel.findOne({where: {id: '1'}});

        expect(customerCreated.toJSON()).toStrictEqual({
            id: customer.Id,
            name: customer.Name,
            active: customer.IsActive,
            rewardPoints: customer.RewardPoints,
            street: customer.Address.street,
            number: customer.Address.number,
            zipcode: customer.Address.zipCode,
            city: customer.Address.city
        });
    });

    it("should update a customer", async() =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1','Product 1');
        const address = new Address('street 1',831,'15995222','josuá');
        customer.changeAddress(address);
        
        await customerRepository.create(customer);
        
        customer.changeName("customer x");
        
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: '1'}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.Id,
            name: customer.Name,
            active: customer.IsActive,
            rewardPoints: customer.RewardPoints,
            street: customer.Address.street,
            number: customer.Address.number,
            zipcode: customer.Address.zipCode,
            city: customer.Address.city
        });
    });

    it("should find a customer", async() =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1','customer 1');
        const address = new Address('street 1',831,'15995222','josuá');
        customer.changeAddress(address);
        
        await customerRepository.create(customer);

        const customerReturned = await customerRepository.find('1');
        const customertModel = await CustomerModel.findOne({where: {id: '1'}});
        var customerByModel = new Customer(customertModel.id, customertModel.name);
        customerByModel.changeAddress(new Address(customertModel.street,customertModel.number,customertModel.zipcode,customertModel.city));
        customerByModel.addRewardPoints(customertModel.rewardPoints);

        expect(customerReturned).toStrictEqual(customerByModel);
    });

    it("should find all customer", async() =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1','customer 1');
        const address = new Address('street 1',831,'15995222','josuá');
        const customer1 = new Customer('2','customer 2');
        const address1 = new Address('street 1',832,'15995222','josuá');
        
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer1.changeAddress(address1);
        customer1.addRewardPoints(15);

        await customerRepository.create(customer);
        await customerRepository.create(customer1);

        var customers = [customer, customer1];
        

        const customerReturned = await customerRepository.findAll();

        expect(customers).toEqual(customerReturned);
    })

    it('should trow error when some customer not found', async () =>{
        const customerRepository = new CustomerRepository();
        
        expect(async()=>{
            await customerRepository.find('456');
        }).rejects.toThrow('Customer not found');
    })

})