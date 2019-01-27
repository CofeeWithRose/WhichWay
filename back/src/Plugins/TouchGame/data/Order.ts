export class Order {

    constructor( blingMiles:number, isLast: boolean, playerId: number ){

        this.blingMiles = blingMiles;
        
        this.isLast = isLast? true : false;

        this.playerId = playerId;
    }

    readonly blingMiles: number;

    readonly isLast: boolean;

    readonly playerId: number;

}