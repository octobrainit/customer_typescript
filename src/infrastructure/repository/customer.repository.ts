
import { Customer } from '../../domain/entity/cutomer';
import CustomerRepositoryInterface from '../../domain/repository/customer.repository.interface';
import { Address } from '../../domain/vo/address';
import CustomerModel from '../db/sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
    
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.Id,
            name: entity.Name,
            active: entity.IsActive,
            rewardPoints: entity.RewardPoints,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zipCode,
            city: entity.Address.city
        });
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.Name,
            active: entity.IsActive,
            rewardPoints: entity.RewardPoints,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zipCode,
            city: entity.Address.city
        },
        {
            where: {
                id: entity.Id
            }
        })
    }
    async find(id: string): Promise<Customer> {
        try{
            const value  = await CustomerModel.findOne({where:{
                id: id
            }});
            var customer = new Customer(value.id, value.name);
            
            customer.addRewardPoints(value.rewardPoints);
            customer.changeAddress(new Address(value.street, value.number, value.zipcode, value.city))
            
            return customer;
        }catch(error){
            throw new Error('Customer not found');
        }
    }
    async findAll(): Promise<Customer[]> {
        const products = await CustomerModel.findAll();
       return products.map<Customer>((customer) =>{
            var newCustomer = new Customer(customer.id, customer.name);
            newCustomer.addRewardPoints(customer.rewardPoints);
            newCustomer.changeAddress(new Address(customer.street, customer.number, customer.zipcode, customer.city))
            return newCustomer
       });
    }

}