import { RoomInterface } from "../interface/RoomInterface";
import { User } from "../data/User";
import { MutiMapInterface } from "../../../Utils/Map/MutiMap/interface/MutiMap";
import MutiMap from "../../../Utils/Map/MutiMap/implement/MutiMap";
import { Client } from "../data/Client";

export  class Room implements RoomInterface {

    constructor(roomId: number){
        this.id = roomId;
    }

    private id: number;

    private clientSet = new Set<Client>();

    private userSet = new Set<User>();

    private client2UserMap: MutiMapInterface<Client, User> = new MutiMap<Client, User>();

    get ClientArray() : Set<Client> {
        return this.clientSet;
    }

    get Client2UserMap(){
        return this.client2UserMap;
    }

    get UserArray(): Set<User>{
        return this.userSet;
    }

    get Id(): number{
        return this.id;
    }

    addClient(newClient: Client): void{
         this.clientSet.add(newClient);
    }

    removeClient(oldClient: Client): void{
        const clientUserSet = this.client2UserMap.get(oldClient);
         // 删除userSet的user.
         clientUserSet.forEach( user => this.userSet.delete(user));
        // 删除usersMap中的client.
        this.client2UserMap.deleteAll(oldClient); 
        // 删除 clientSet 中的ws.
        this.clientSet.delete(oldClient);
       
    }


    addUser(ws: Client, userId: number): void{
        
    }

    deleteUser(ws: Client, userId: number): void{

    }

    getClientCount(): number{
        return 0;
    }

    getUserCount(): number{
        return 0;
    }

}