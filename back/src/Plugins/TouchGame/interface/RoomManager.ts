import * as WebSocket from "ws"
import {IdManagerInterface} from "./IdManager";

interface RoomManagerConstructor{
    
    new (idManager: IdManagerInterface): RoomManagerInterface;
}

export function createRoomManager( roomManagerConstructor: RoomManagerConstructor, idManager: IdManagerInterface){
    return new roomManagerConstructor(idManager);
}

export interface RoomManagerInterface{

    
    /**
     * ws端用 login 消息户进入房间.
     * @param roomId 房间 Id.
     * @param delayMiles 客户端与与服务端之间的时差.
     * @param ws 
     */
    enterRoom(roomId: number, ws: WebSocket, delayMiles: number):void;

    /**
     * 给房间特定的客户端添加用户.
     * @param playerId
     * @param ws 
     */
    addPlayer(ws:WebSocket, playerId: number):void;

    /**
     * 从房间中删除用户.
     * @param ws 
     * @param playerId 
     */
    deletePlayer( ws:WebSocket, playerId: number):void;

    /**
     * ws客户端离开房间.
     * @param ws 
     */
    outRoom( ws: WebSocket): void;


} 