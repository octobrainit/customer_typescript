import Product from "../entity/product";
import ProductService from "./product.service";

describe('Product service unit test',()=>{
    
    it('should change the prices of all products',()=>{
        var product1 = new Product("1","Prod 1",10);
        var product2 = new Product("2","Prod 2",20);
        var products = [product1, product2];
        
        ProductService.increasePrice(products, 100);

        expect(product1.Price).toBe(20);
        expect(product2.Price).toBe(40);
    });

    
})