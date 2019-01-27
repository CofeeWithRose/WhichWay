import * as WebSocket from 'ws';

export class Client{

    constructor(ws: WebSocket, delayMiles: number){
        this.ws = ws;
        this.delayMiles = Number(delayMiles) || 0;
    }

    readonly ws: WebSocket;


    readonly delayMiles: number;
}