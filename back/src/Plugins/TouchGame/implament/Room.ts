import { RoomInterface } from "../interface/RoomInterface";
import { Player } from "../data/User";
import { MutiMapInterface } from "../../../Utils/Map/MutiMap/interface/MutiMap";
import MutiMap from "../../../Utils/Map/MutiMap/implement/MutiMap";
import { Client } from "../data/Client";
import { MessageType } from "../interface/GameManager";

export  class Room implements RoomInterface {

    constructor(roomId: number){
        this.id = roomId;
    }

    private id: number;

    private clientSet = new Set<Client>();

    private playerSet = new Set<Player>();

    private clientPlayerKey2Player = new Map<string, Player>();

    private client2PlayerMap: MutiMapInterface<Client, Player> = new MutiMap<Client, Player>();

    private stopMiles = 0;

    get Id(): number{
        return this.id;
    }

    addClient(newClient: Client): void{
         this.clientSet.add(newClient);
    }

    deleteClient(oldClient: Client): void{
        
        const clientUserSet = this.client2PlayerMap.get(oldClient);

        // 删除userSet的user.
        clientUserSet && clientUserSet.forEach( player => this.playerSet.delete(player));
        
        // 删除usersMap中的client.
        this.client2PlayerMap.deleteAll(oldClient); 
        
        // 删除 clientSet 中的ws.
        this.clientSet.delete(oldClient);
       
    }

    private getClientPlayerKey(clientId: number, playerId: number){
        return `${clientId}_${playerId}`;
    }

    addPlayer(client: Client, playerId: number): void{
        this.addClient(client);
        const key = this.getClientPlayerKey(client.id, playerId);
        const player = this.clientPlayerKey2Player.get(key)||new Player( playerId, client);
        this.playerSet.add(player);
        this.client2PlayerMap.add(client, player);
        this.clientPlayerKey2Player.set(key, player);
        this.broadCastPlayerCount(MessageType.ADD_PLAYER);
        this.showStart();
        console.log('deletePlayer: roomid:',client.roomId, 'playerid: ', playerId);
        console.log('player count: ', this.playerSet.size);
    }

    private showStart(){
        if(this.playerSet.size > 1 && this.stopMiles < Date.now()){
            const client = this.clientSet.values().next().value;
           client.ws.send(JSON.stringify({
               type: MessageType.SHOW_START,
           }))
        }
    }

    private broadCastPlayerCount(messageType: MessageType){
        this.clientSet.forEach( client => {
            client.ws.send(JSON.stringify( {
                type: messageType, 
                playerCount: this.playerSet.size,
            }));
        });
    }

    deletePlayer(client: Client, playerId: number): void{
        const key = this.getClientPlayerKey(client.id, playerId);
        const player = this.clientPlayerKey2Player.get(key);
        if(player){
            this.playerSet.delete(player);
            this.clientPlayerKey2Player.delete(key);
            this.client2PlayerMap.deleteItem(client, player);
            if(!this.client2PlayerMap.size){
                this.clientSet.delete(client);
                console.log(`destory client ${client.id}`);
            }
            this.broadCastPlayerCount(MessageType.DELETE_PLAYER);
        }
        

    }

    getClientCount(): number{
        return this.clientSet.size;
    }

    getPlayerCount(): number{
        return this.playerSet.size;
    }

    start(){
        // TODO.
        console.log(`${this.Id} room start.`);
    }

}