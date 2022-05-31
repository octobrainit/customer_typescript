import Product from "./product";

describe('Product unit test',()=>{
    
    it('should be wrong when create without id',() =>{
        expect(()=>{
            var product = new Product("","Product 1",10);

        }).toThrowError("Id is required");
    })

    it('should be wrong when create without Name',() =>{
        expect(()=>{
            var product = new Product("123","",10);
        }).toThrowError("Name is required");
    })

    it('should be wrong when create without price',() =>{
        expect(()=>{
            var product = new Product("123","Product 1", 0);
        }).toThrowError("Price is required");
    })

    it('should be wrong when change name without value',() =>{
        expect(()=>{
            var product = new Product("123","Product 1",10);
            product.changeName("");
        }).toThrowError("Name is required");
    })

    it('should be wrong when change price without value',() =>{
        expect(()=>{
            var product = new Product("123","Product 1",10);
            product.changePrice(0);
        }).toThrowError("Price is required");
    })

});