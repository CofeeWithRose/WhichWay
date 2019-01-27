import * as WebSocket from 'ws';

export class Client{

    constructor( clientId:number, ws: WebSocket, delayMiles: number){
        this.id = clientId;
        this.ws = ws;
        this.delayMiles = Number(delayMiles) || 0;
    }

    readonly id: number;

    readonly ws: WebSocket;


    readonly delayMiles: number;
}