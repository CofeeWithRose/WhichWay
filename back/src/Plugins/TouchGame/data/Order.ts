/**
 * 消息闪动的消息描述.
 */
export class Order {

    constructor( blingMiles:number, isLast: boolean, playerId: number ){

        this.blingMiles = blingMiles;
        
        this.isLast = isLast? true : false;

        this.playerId = playerId;

    }

    /**
     * 开始闪动的时间.
     */
    readonly blingMiles: number;

    /**
     * 是否是最后一个.
     */
    readonly isLast: boolean;

    /**
     * 闪动的playerId.
     */
    readonly playerId: number;

    /**
     * 闪动持续时长,最后一个没有值.
     */
    lastMiles? : number;
    
}