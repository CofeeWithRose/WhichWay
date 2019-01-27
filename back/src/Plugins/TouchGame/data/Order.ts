export class Order {

    constructor( blingMiles:number, isLast?: boolean ){

        this.blingMiles = blingMiles;
        
        this.isLast = isLast? true : false;
    }

    readonly blingMiles: number;

    readonly isLast: boolean;

}