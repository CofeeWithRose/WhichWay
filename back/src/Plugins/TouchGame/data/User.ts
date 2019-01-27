import * as WebSocket from 'ws';
import { Order } from './Order';

export class User{
    
    constructor( id: number, client: WebSocket, delayMiles: number ){
        this.id = id;
        this.client = client;
        this.delayMiles = delayMiles;
    }

    readonly id:number;

    readonly client: WebSocket;

    readonly delayMiles: number;

    isRunning: boolean;

    readonly orderArray: Array<Order> = [];
    
}