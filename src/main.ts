import { Customer } from "./entity/cutomer";
import { Address } from './vo/address';
import OrderItem from './entity/orderItem';
import { Order } from './entity/order';

let customer = new Customer("123", "Anderson");
let address = new Address("Rua XPTO",831,"15995222","Matão");

customer.changeAddress(address);

let item1 = new OrderItem("1","item 1",12);
let item2 = new OrderItem("2","item 2",15);
let order = new Order("1",customer.Id,[item1,item2]);


