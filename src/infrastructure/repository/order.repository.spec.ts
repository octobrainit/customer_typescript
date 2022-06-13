import { Sequelize } from 'sequelize-typescript';
import { Customer } from '../../domain/entity/cutomer';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/orderItem.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import { Address } from '../../domain/vo/address';
import ProductRepository from './product.repository';
import Product from '../../domain/entity/product';
import OrderItem from '../../domain/entity/orderItem';
import { Order } from '../../domain/entity/order';
import OrderRepository from './order.repository';




describe('Order repository unit test', ()=>{
    let sequilize: Sequelize;

    beforeEach(async () =>{
        
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        sequilize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel
        ]);

        await sequilize.sync();
    });
    
    afterEach( async () =>{
        await sequilize.close();
    });

    it('should create a new Order', async()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1','Customer 1');
        customer.changeAddress(new Address('Victorio Pinotti',831,'15995222','Matao'));

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1','Product 1', 15);

        await productRepository.create(product);

        const orderItem = new OrderItem('1',product.Name,product.Price, product.Id, 2);
        const order = new Order('1',customer.Id, [orderItem]);

        const orderRepository = new OrderRepository();
        
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.Id},
            include: ["items"]
        });
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.Id,
            customer_id: order.customer_Id,
            total: order.Total,
            items: [
                {
                    id: orderItem.Id,
                    name: orderItem.Name,
                    price: orderItem.Price,
                    quantity: orderItem.Quantity,
                    order_id: order.Id,
                    product_id: orderItem.ProductId
                }
            ]
        });
    })

    it('should update a Order', async()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1','Customer 1');
        customer.changeAddress(new Address('Victorio Pinotti',831,'15995222','Matao'));
        await customerRepository.create(customer);
        
        const productRepository = new ProductRepository();
        const product = new Product('1','Product 1', 15);
        await productRepository.create(product);
        
        const orderItem = new OrderItem('1',product.Name,product.Price, product.Id, 2);
        const order = new Order('1',customer.Id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const item2 = new OrderItem('2',product.Name,product.Price, product.Id, 2);
        order.AddItem(item2);
        
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({where: {id : order.Id},include: ["items"]});
        const orderReturned = await orderRepository.find(order.Id);
        const itemsonModel = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));

        expect(orderReturned).toStrictEqual(new Order(orderModel.id, orderModel.customer_id,itemsonModel));
    })

    it('should find a order',async ()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1','Customer 1');
        customer.changeAddress(new Address('Victorio Pinotti',831,'15995222','Matao'));

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1','Product 1', 15);

        await productRepository.create(product);

        const orderItem = new OrderItem('1',product.Name,product.Price, product.Id, 2);
        const order = new Order('1',customer.Id, [orderItem]);
        const orderRepository = new OrderRepository();
        
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({where: {id : order.Id},include: ["items"]});
        const orderReturned = await orderRepository.find(order.Id);
        const itemsonModel = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));

        expect(orderReturned).toStrictEqual(new Order(orderModel.id, orderModel.customer_id,itemsonModel));
    });

    it('should trow error when some order not found', async () =>{
        const orderRepository = new OrderRepository();
        
        expect(async()=>{
            await orderRepository.find('456');
        }).rejects.toThrow('Order not found');
    })

    it('should find all orders',async ()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1','Customer 1');
        customer.changeAddress(new Address('Victorio Pinotti',831,'15995222','Matao'));

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1','Product 1', 15);

        await productRepository.create(product);

        const orderItem = new OrderItem('1',product.Name,product.Price, product.Id, 2);
        const order = new Order('1',customer.Id, [orderItem]);
        const orderItem2 = new OrderItem('2',product.Name,product.Price, product.Id, 2);
        const order2 = new Order('2',customer.Id, [orderItem2]);
        const orderRepository = new OrderRepository();
        
        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orderExpected = [order, order2];
        const orderReturned = await orderRepository.findAll();
        expect(orderReturned).toStrictEqual(orderExpected);
    });

})