export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;

        this._validate();
    }

    private _validate(){
        if(this._id.length === 0)
            throw new Error("Id is required");
        if(this._name.length === 0)
            throw new Error("Name is required");
        if(this._price <= 0)
            throw new Error("Price is required");
        if(this._quantity <= 0)
            throw new Error("Quantity is required");
    }

    changeName(name: string){
        this._name = name;
        this._validate();
    }

    changePrice(price: number){
        this._price = price;
        this._validate();
    }

    changeQuantity(quantity: number){
        this._quantity = quantity;
        this._validate();
    }

    get Id(): string {
        return this._id;
    }
    get Name(): string{
        return this._name;
    }
    get Price(): number{
        return this._price;
    }
    get Quantity(): number{
        return this._quantity;
    }
    get ProductId(): string {
        return this._productId;
    }
}