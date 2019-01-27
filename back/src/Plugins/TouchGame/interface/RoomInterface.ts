import { Player } from "../data/User";
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

    // readonly PlayerSet: Set<Player>;

    // readonly ClientArray: Set<Client>;

    // readonly Client2PlayerMap: MutiMapInterface<Client, Player>;

    addClient(newClient: Client): void;

    removeClient(oldClient: Client): void;

    addPlayer(client: Client, playerId: number): void;

    deletePlayer(client: Client, playerId: number): void;

    getClientCount(): number;

    getPlayerCount(): number;

    start(): void;
    
}