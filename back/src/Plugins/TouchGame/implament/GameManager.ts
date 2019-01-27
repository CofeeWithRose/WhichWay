import * as WebSocket from "ws"
import * as  http from 'http';
import MutiMap from '../../../Utils/Map/MutiMap/implement/MutiMap';
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

            this.roomManager.enterRoom( roomId, ws );

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
    
        // const roomId = this.ws2RoomIdMap.get(ws);
        // console.---(`TouchGame: close client in ${ roomId }`);
        // this.ws2RoomIdMap.delete(ws);
        // this.roomId2WsArrayMap.deleteItem(roomId, ws);
        // if( !this.roomId2WsArrayMap.has(roomId) ){
        //     this.idManager.deleteRoomId(roomId);
        //     console.log(`TouchGame: room ${ roomId } is destroied.`);
        // }
    }
    
    createRoomId(): number{
        return this.idManager.createRoomId();
    }

    checkRoomId(roomId: number): boolean {
        return this.idManager.checkRoomId( roomId );
    }

}