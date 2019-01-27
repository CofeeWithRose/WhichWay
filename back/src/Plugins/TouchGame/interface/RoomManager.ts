import * as WebSocket from "ws"
import IdManagerInterface from "./IdManager";

interface RoomManagerConstructor{
    new (idManager: IdManagerInterface): RoomManagerInterface
}

export function createRoomManager( roomManagerConstructor:RoomManagerConstructor, idManager: IdManagerInterface ){
    return new roomManagerConstructor(idManager);
}

export interface User{
    delayMileSeconds: number,
    userId: number,
}

export interface RoomManagerInterface{
    
    /**
     * ws端用户进入房间， 若该Id下没有房间，则注册id并分配房间.
     * @param roomId 房间 Id.
     * @param ws 
     */
    enterRoom(roomId: number, ws: WebSocket):void;

    /**
     * 给房间特定的客户端添加用户.
     * @param roomId
     * @param ws 
     */
    addUser(ws:WebSocket):void;

    /**
     * 从房间中删除用户.
     * @param userId 
     */
    removeUser( userId: number):void;

    /**
     * ws客户端离开房间.
     * @param ws 
     */
    outRoom( ws: WebSocket): void;

} 