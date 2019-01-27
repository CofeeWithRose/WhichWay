import * as WebSocket from 'ws';
import { RoomManagerInterface } from '../interface/RoomManager';
import {IdManagerInterface} from '../interface/IdManager';
import { Client } from '../data/Client';
import { RoomInterface } from '../interface/RoomInterface';
import { Room } from './Room';


export class RoomManager implements RoomManagerInterface{

    constructor(idManager: IdManagerInterface){

        this.idManager = idManager;
    
    }

    /**
     * 用于累加生成客户端 id .
     */
    private clientId = 0;

    /**
     * ws 与客户端的对应关系.
     */
    private ws2ClientMap = new Map<WebSocket, Client>();

    /**
     * roomId 与 room 的映射关系.
     */
    private roomId2RomMap = new Map<number, RoomInterface>();

    /**
     * 为页面生成管理 roomId.
     */
    private idManager: IdManagerInterface;


   
    /**
     * ws端用户进入房间， 若该Id下没有房间，则注册id并分配房间.
     * @param roomId 房间 Id.
     * @param ws 
     */
    enterRoom(roomId: number, ws: WebSocket, delayMiles: number):void {
        
        if(!this.idManager.checkRoomId(roomId)){
            this.idManager.reCoverRoomId(roomId);
        }

        let room = this.roomId2RomMap.get(roomId);
        if(!room){
            room = new Room(roomId);
            this.roomId2RomMap.set(roomId, room);
            console.log(`add room ${room.Id}`);

        }

        let client = this.ws2ClientMap.get(ws);

        if(!client){
            client = new Client( ++this.clientId, ws, delayMiles, roomId);
            this.ws2ClientMap.set(ws, client);
        }
        room.addClient(client);
    }

    /**
     * 给房间特定的客户端添加用户.
     * @param playerId
     * @param ws 
     */
    addPlayer(ws:WebSocket, playerId: number):void{
        const client = this.ws2ClientMap.get( ws);
        const room = this.roomId2RomMap.get(client.roomId);
        room.addPlayer(client, playerId);
        console.log('addplayer roomid: ', room.Id,'playerid: ', playerId);
    }

    /**
     * 从房间中删除用户.
     * @param playerId 
     * @param ws
     */
    deletePlayer( ws: WebSocket, playerId: number):void{
        const client = this.ws2ClientMap.get(ws);
        const room = this.roomId2RomMap.get(client.roomId);
        room.deletePlayer(client, playerId);
     
    }

    /**
     * ws客户端离开房间.
     * @param ws 
     */
    outRoom( ws: WebSocket): void{
        const client = this.ws2ClientMap.get(ws);
        const room = this.roomId2RomMap.get(client.roomId);

        this.ws2ClientMap.delete(ws);
        
        room.deleteClient(client);
        
        if(!room.getClientCount()){
            this.roomId2RomMap.delete(client.roomId);
            this.idManager.deleteRoomId(client.roomId);
            console.log(`destory room ${room.Id}`);
        }
        console.log(`roomid: ${client.roomId} out room count: ` , this.roomId2RomMap.size);
       
    }

    start(ws: WebSocket){
        const client = this.ws2ClientMap.get(ws);
        this.roomId2RomMap.get(client.roomId).start();
    }

}
