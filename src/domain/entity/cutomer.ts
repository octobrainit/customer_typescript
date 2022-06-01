import { Address } from "../vo/address";

export class Customer {
    private _id: string;
    private _name: string;
    private _address !: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this._validate();
    }

    private _validate(){
        if(this._name.length == 0)
            throw new Error("Name is required");
        if(this._id.length === 0)
            throw new Error("Id is required");
        if(this._active && this._address == undefined){
            this.deactivate();
            throw new Error("Address is required to activate customer");
        }
    }

    changeName(name: string) : void {
        if(name.length == 0)
            throw new Error("Name is required");
        this._name = name;
    }

    activate() : void {
        this._active = true;
        this._validate();
    }

    deactivate() : void {
        this._active = false;
    }

    changeAddress(address: Address) : void {
        this._address = address;
        this.activate();
        this._validate();
    }

    addRewardPoints(number: number) : void {
        this._rewardPoints += number;
    }

    get Id(): string {
        return this._id;
    }
    get Name(): string {
        return this._name;
    }
    get IsActive(): boolean {
        return this._active;
    }
    get RewardPoints(): number {
        return this._rewardPoints;
    }
    get Address(): Address {
        return this._address;
    }
}