import { Order } from './Order';
import { Client } from './Client';

export class Player{
    
    constructor( playerId: number, client: Client ){
        this.id = playerId;
        this.client = client;
    }

    readonly id:number;

    readonly client: Client;

    isRunning: boolean;

    readonly orderArray: Array<Order> = [];
    
}