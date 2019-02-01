export class Order {

    constructor( blingMiles:number, isLast: boolean, playerId: number, lastMiles: number ){

        this.blingMiles = blingMiles;
        
        this.isLast = isLast? true : false;

        this.playerId = playerId;

        this.lastMiles = lastMiles;
    }

    readonly blingMiles: number;

    readonly isLast: boolean;

    readonly playerId: number;

    readonly lastMiles: number;
    
}