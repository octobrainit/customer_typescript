import { Sequelize } from "sequelize-typescript";
import ProductModel from '../db/sequelize/model/product.model';
import Product from '../../domain/entity/product';
import ProductRepository from "./product.repository";

describe('Product repository test', () =>{
    let sequilize: Sequelize;

    beforeEach(async () =>{
        
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        sequilize.addModels([
            ProductModel
        ]);

        await sequilize.sync();
    });
    
    afterEach( async () =>{
        await sequilize.close();
    });
   
    it("should create a product", async() =>{
        const productRepository = new ProductRepository();
        const product = new Product('1','Product 1', 100);
        
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: '1'}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
    })

    it("should update a product", async() =>{
        const productRepository = new ProductRepository();
        const product = new Product('1','Product 1', 100);
        
        await productRepository.create(product);
        
        product.changeName("Product x");
        
        await productRepository.update(product);

        const productModel = await ProductModel.findOne({where: {id: '1'}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product x",
            price: 100
        });
    })

    it("should find a product", async() =>{
        const productRepository = new ProductRepository();
        const product = new Product('1','Product 1', 100);
        
        await productRepository.create(product);

        const productReturned = await productRepository.find('1');
        const productModel = await ProductModel.findOne({where: {id: '1'}});

        expect(productReturned).toStrictEqual(new Product(productModel.id, productModel.name, productModel.price));
    })

    it("should find all product", async() =>{
        const productRepository = new ProductRepository();
        const product = new Product('1','Product 1', 100);
        const product2 = new Product('2','Product 2', 10);
        const products = [product, product2];
        
        await productRepository.create(product);
        await productRepository.create(product2);

        const productReturned = await productRepository.findAll();

        expect(products).toEqual(productReturned);
    })
});