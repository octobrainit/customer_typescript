export default class Product {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._validate();
    }

    private _validate(){
        if(this._id.length === 0)
            throw new Error("Id is required");
        if(this._name.length === 0)
            throw new Error("Name is required");
        if(this._price <= 0)
            throw new Error("Price is required");
    }

    get Name(): string{
        return this._name;
    }
    get Id(): string{
        return this._id;
    }
    get Price(): number{
        return this._price;
    }
    
    changeName(name: string) {
        this._name = name;
        this._validate();
    }
    changePrice(price: number) {
        this._price = price;
        this._validate();
    }
}