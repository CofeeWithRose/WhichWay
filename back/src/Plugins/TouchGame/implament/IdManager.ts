import {IdManagerInterface} from "../interface/IdManager";

export default class IdManager implements IdManagerInterface{

    private roomId = 0;

    private roomIdMap = new Map<number, boolean>();
     /**
     * 重新启用roomid.
     * 
     * @param roomId 通过createRoomId创建的roomId.
     */
    reCoverRoomId(roomId: number):void{
        if(!this.roomIdMap.get(roomId)){
            this.roomIdMap.set( roomId, true);
        }
    }

    /**
     * 创建 roomId.
     * @returns roomId.
     */
    createRoomId(): number{
        this.roomIdMap.set( ++this.roomId, true );
        return this.roomId;
    }

    /**
     * 删除 roomId.
     */
    deleteRoomId( roomId: number): void{
        this.roomIdMap.delete(roomId);
    }

    /**
     * 校验 roomId 是否有效s`.
     * @param roomId createRoomId 创建的Id.
     */
    checkRoomId( roomId: number):boolean{
        return this.roomIdMap.get(roomId);
    }
}