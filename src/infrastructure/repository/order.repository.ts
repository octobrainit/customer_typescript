import { Order } from '../../domain/entity/order';
import OrderRepositoryInterface from '../../domain/repository/order.repository.interface';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/orderItem.model';
import OrderItem from '../../domain/entity/orderItem';

export default class OrderRepository implements OrderRepositoryInterface {
    
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.Id,
            customer_id: entity.customer_Id,
            total: entity.Total,
            items:entity.Items.map(item =>({
                id: item.Id,
                name: item.Name,
                price: item.Price,
                product_id: item.ProductId,
                quantity: item.Quantity
            }))
        },{
            include: [{model: OrderItemModel}]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.destroy({where: { id: entity.Id }})
        await OrderModel.create({
            id: entity.Id,
            customer_id: entity.customer_Id,
            total: entity.Total,
            items:entity.Items.map(item =>({
                id: item.Id,
                name: item.Name,
                price: item.Price,
                product_id: item.ProductId,
                quantity: item.Quantity
            }))
        },{
            include: [{model: OrderItemModel}]
        });
    }
    async find(id: string): Promise<Order> {
        try{
            const value  = await OrderModel.findOne({where:{
                id: id
            },include: ["items"]});
            var items = value.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
            var order = new Order(value.id,value.customer_id,items);

            return order;
        }catch(error){
            throw new Error('Order not found');
        }
    }
    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({include: ["items"]});
        var data = orders.map(order => {
            var items = order.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
            var orderToReturn = new Order(order.id,order.customer_id,items);
            return orderToReturn;
        });
        return data;
    }
}