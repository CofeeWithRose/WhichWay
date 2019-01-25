import * as WebSocket from "ws"
import * as  http from 'http';



export default class SocketClientManager{

    constructor(){
        this._initWss();
    }
    _initWss(){
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

    onMessage(data:WebSocket.Data){
        console.log('socket message: ', data);
    }

}