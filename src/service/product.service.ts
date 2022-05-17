import Product from "../entity/product";

export default class ProductService{
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product =>{
            if (percentage != 0)
                product.changePrice(product.Price * (1 +(percentage/100)))
        });
    }
}