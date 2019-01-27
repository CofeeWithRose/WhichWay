import { User } from "../data/User";
import * as WebSocket from 'ws';
import {MutiMapInterface} from "../../../Utils/Map/MutiMap/interface/MutiMap";

export interface RoomInterface{
    
    new (roomId: number): RoomInterface;

    readonly Id: number;

    readonly userArray: Array<User>;

    readonly clientArray: Array<WebSocket>;

    readonly client2UserMap: MutiMapInterface<WebSocket, User>;


    removeClient(ws: WebSocket): void;

    addUser(ws: WebSocket, userId: number): void;

    deleteUser(ws: WebSocket, userId: number): void;

    getClientCount(): number;

    getUserCount(): number;
}