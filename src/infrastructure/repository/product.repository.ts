import product from '../../domain/entity/product';
import ProductRepositoryInterface from '../../domain/repository/product.repository.interface';
import ProductModel from '../db/sequelize/model/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
    
    async create(entity: product): Promise<void> {
        await ProductModel.create({
            id: entity.Id,
            name: entity.Name,
            price: entity.Price
        });
    }
    async update(entity: product): Promise<void> {
        await ProductModel.update({
            name: entity.Name,
            price: entity.Price
        },
        {
            where: {
                id: entity.Id
            }
        })
    }
    async find(id: string): Promise<product> {
         const value  = await ProductModel.findOne({where:{
            id: id
        }});

        return new product(value.id, value.name, value.price);
    }
    async findAll(): Promise<product[]> {
       const products = await ProductModel.findAll();
       return products.map<product>((productModel) => new product(productModel.id, productModel.name, productModel.price))
    }
}