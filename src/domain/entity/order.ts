import OrderItem from "./orderItem";

export class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, curstomerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = curstomerId;
        this._items = items;
        this._total = this.total();

        this._validate();
    }

    private _validate(){
        if(this._id.length === 0)
            throw new Error("Id is required");
        if(this._customerId.length === 0)
            throw new Error("CustomerId is required");
        if(this._items.length === 0)
            throw new Error("Order require one or more Order Items");
    }

    total(): number {
        return this._items.reduce((acumulator,item) => acumulator + (item.Price), 0);
    }

    public AddItem(item: OrderItem ) : void {
        this._items.concat(item);
        this._total = this.total();
    }

    public AddItems(item: OrderItem[] ) : void {
        this._items.concat(item);
    }

    get Id(): string {
        return this._id;
    }
    get customer_Id(): string {
        return this._customerId;
    }
    get Total(): number {
        return this._total; 
    }
    get Items(): OrderItem[] {
        return this._items;
    }
}