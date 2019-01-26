import * as WebSocket from "ws"
import * as  http from 'http';
import MutiMap from '../../../Utils/Map/MutiMap/implement/MutiMap';


enum MessageType{
    LOGIN = 'login',
    ADD_POINT = 'addPoint',
}

export default class SocketClientManager{

    constructor(){
        this.initWss();
        this.initProcess();
    }
    private roomId2WsArrayMap = new MutiMap<number, WebSocket>();

    private ws2RoomIdMap = new Map<WebSocket, number>();

    private roomRecord = new Map<number, boolean>();
    
    private roomId = 0;
   
    private processer = new Map<String, (message: object, ws:WebSocket) => void>();

    private initProcess(){
        this.processer.set(MessageType.LOGIN, this.onLogin.bind(this));
    }

    private initWss(){
        const server = http.createServer();
        const wss = new WebSocket.Server({server});

        wss.on('connection',  ws => {
            console.log('client connection.');
            // this.onConnect(ws);
            ws.on('message', data => {
                this.onMessage(data);
            });
            ws.on('close', () => {
                this.onClose(ws);
            })
        });

        server.listen(8000, function listening() {
            console.log('socket service started ！');
        });
    }

    private onMessage(data:WebSocket.Data){
        const message = JSON.parse( data.toString() );
        try{

        }catch(e){
            console.error(e.message);
        }
        console.log('socket message: ', message.type );
    }

    private onLogin(message: {type: string, roomId: number|string}, ws: WebSocket){
        const roomId = message && Number(message.roomId);
        if(!roomId ){
            console.warn(' login whithout room id!');
            return;
        }
        this.ws2RoomIdMap.set(ws, roomId);
        this.roomId2WsArrayMap.set(roomId, ws);
    }

    onClose(ws: WebSocket){
        const roomId = this.ws2RoomIdMap.get(ws);
        this.ws2RoomIdMap.delete(ws);
        this.roomId2WsArrayMap.deleteItem(roomId, ws);
    }
    
    // onConnect(ws: WebSocket){
    //     this.map
    // }

    createRoomId(): number{
        this.roomRecord.set( ++this.roomId, true);
        return this.roomId;
    }

    hasRoomId(roomId: number): boolean {
        return this.roomRecord.get(roomId);
    }

}