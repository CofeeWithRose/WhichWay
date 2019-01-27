import * as WebSocket from "ws"
import * as  http from 'http';
import { MessageType, GameManagerInterface } from "../interface/GameManager";
import {IdManagerInterface} from "../interface/IdManager";
import IdManager from "./IdManager";
import { RoomManager } from "./RoomManager";
import { RoomManagerInterface, createRoomManager } from "../interface/RoomManager";

export default class GameManager implements GameManagerInterface{

    constructor(wsPort: number){
        this.initWss(wsPort);
        this.initProcess();
    }

    private idManager: IdManagerInterface = new IdManager();

    private roomManager: RoomManagerInterface = createRoomManager(RoomManager, this.idManager);

    private processer = new Map< String, (message: object, ws:WebSocket) => void >();

    private initProcess(){
        this.processer.set(MessageType.LOGIN, this.onLogin.bind(this));
        this.processer.set(MessageType.ADD_PLAYER, this.onAddPlayer.bind(this));
        this.processer.set(MessageType.DELETE_PLAYER, this.onDeletePlayer.bind(this));
        this.processer.set(MessageType.START, this.onStart.bind(this));
        
    }

    private initWss(wsPort: number){
        const server = http.createServer();
        const wss = new WebSocket.Server({server});

        wss.on('connection',  ws => {
            console.log('TouchGame: client connection.');
            // this.onConnect(ws);
            ws.on('message', data => {
                this.onMessage(data, ws);
            });
            ws.on('close', () => {
                this.onLogOut(ws);
            });
            ws.on('error', () => {
                this.onLogOut(ws);
            })
        });

        server.listen(wsPort, function listening() {
            console.log(`TouchGame: socket service started at ${wsPort}!`);
        });
    }

    onMessage(data:WebSocket.Data, ws:WebSocket){
        const message = JSON.parse( data.toString() );
        try{
            if(message&&message.type){
                const fn = this.processer.get(message.type);
                if(fn){
                    fn(message, ws );
                }else{
                    console.warn(`TouchGame: no function fount! tyep is 【 ${message.tyep} 】`);
                }
            }
        }catch(e){
            console.error(e.message);
        }
    }

    onLogin(message: {type: string, roomId: number|string, currentMileSeconds: number }, ws: WebSocket){

        const roomId = message && Number(message.roomId);
        if(!roomId ){
            console.warn('TouchGame: login whithout room id!');
            return;
        }else{

            const delayMiles =  message.currentMileSeconds? Date.now() - message.currentMileSeconds : 0;
            
            this.roomManager.enterRoom( roomId, ws, delayMiles );

            // if(!this.idManager.checkRoomId(roomId)){
            //     this.idManager.reCoverRoomId(roomId);
            //     console.log(`TouchGame: create room in ${roomId}`);
            // }
            // this.ws2RoomIdMap.set(ws, roomId);
            // this.roomId2WsArrayMap.set(roomId, ws);
            // console.log(`TouchGame: login room ${roomId}`)
        }
       
    }

    onLogOut(ws: WebSocket){

        this.roomManager.outRoom( ws );
    }

    onAddPlayer(message: { type: MessageType, playerId: number}, ws: WebSocket){
        const playerId = Number(message.playerId);
        if(isNaN(playerId)){
            console.error(' 没有 playerId ');
        } else{
            this.roomManager.addPlayer( ws, playerId );
        }
        
    }

    onDeletePlayer( message: { type: MessageType, playerId: number}, ws: WebSocket ){
        const playerId = Number(message.playerId);
        if(isNaN(playerId)){
            console.error(' 没有 playerId ');
        } else{
            this.roomManager.deletePlayer( ws, playerId );
        }
    }

    onStart( message: { type: MessageType }, ws: WebSocket){
        console.log('start...');
        this.roomManager.start(ws);
    }
    
    createRoomId(): number{
        return this.idManager.createRoomId();
    }

    checkRoomId(roomId: number): boolean {
        return this.idManager.checkRoomId( roomId );
    }

}