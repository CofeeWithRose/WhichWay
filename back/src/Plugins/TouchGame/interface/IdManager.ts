export default interface IdManagerInterface{

    /**
     * 重新启用roomid.
     * 
     * @param roomId 通过createRoomId创建的roomId.
     */
    reCoverRoomId(roomId: number):void;

    /**
     * 创建 roomId.
     * @returns roomId.
     */
    createRoomId(): number;

    /**
     * 删除 roomId.
     */
    deleteRoomId( roomId: number): void;

    /**
     * 校验 roomId 是否有效s`.
     * @param roomId createRoomId 创建的Id.
     */
    checkRoomId( roomId: number):boolean;
}