import { User } from "../data/User";
import {MutiMapInterface} from "../../../Utils/Map/MutiMap/interface/MutiMap";
import { Client } from "../data/Client";


export interface RoomConstructor{
    new (roomId: number): RoomInterface;

}

export function createRoom(roomConstructor: RoomConstructor, roomId: number){
    return new roomConstructor(roomId);
}

export interface RoomInterface{
    

    readonly Id: number;

    readonly UserArray: Set<User>;

    readonly ClientArray: Set<Client>;

    readonly Client2UserMap: MutiMapInterface<Client, User>;

    addClient(newClient: Client): void;

    removeClient(oldClient: Client): void;

    addUser(client: Client, userId: number): void;

    deleteUser(client: Client, userId: number): void;

    getClientCount(): number;

    getUserCount(): number;
    
}