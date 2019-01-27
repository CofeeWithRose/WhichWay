import * as WebSocket from 'ws';

export class Client{

    constructor( clientId:number, ws: WebSocket, delayMiles: number, roomId: number){
        this.id = clientId;
        this.ws = ws;
        this.delayMiles = Number(delayMiles) || 0;
        this.roomId = roomId;
    }

    readonly id: number;

    readonly ws: WebSocket;

    readonly roomId: number;

    readonly delayMiles: number;
}