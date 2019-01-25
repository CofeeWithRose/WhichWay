import * as WebSocket from "ws"
import * as  http from 'http';



export default class SocketClientManager{

    constructor(){
        this.initWss();
    }
    private roomIdMap = new Map<number, Array<WebSocket> >();

    private roomRecord = new Map<number, boolean>(); 
    private roomId = 0;

    private initWss(){
        const server = http.createServer();
        const wss = new WebSocket.Server({server});

        wss.on('connection',  ws => {
            console.log('client connection.');
            ws.on('message', data => {
                this.onMessage(data);
            });
        });

        server.listen(8000, function listening() {
            console.log('socket service started ！');
        });
    }

    private onMessage(data:WebSocket.Data){
        console.log('socket message: ', data);
    }

    createRoomId(): number{
        this.roomRecord.set( ++this.roomId, true);
        return this.roomId;
    }

    hasRoomId(roomId: number): boolean {
        return this.roomRecord.get(roomId);
    }

}