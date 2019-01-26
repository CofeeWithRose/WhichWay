import * as Koa from "koa";
import GameManager from "./implament/GameManager";
import { GameManagerInterface } from "./interface/GameManager";


export default function TouchGame( pathNameReg: RegExp, wsPort:number ){

    // const socketClientManager = new  SocketClientManager(wsPort);
    // const roomManager: RoomManagerInterface = createRoomMnanager(RoomManager, wsPort);
    const gameManager: GameManagerInterface = new GameManager(wsPort);

    return (ctx: Koa.ParameterizedContext<any,{}>, next:()=> Promise<any> )=>{
        if(
            pathNameReg.test(ctx.URL.pathname) && 
            !gameManager.checkRoomId(Number( ctx.URL.searchParams.get('roomId')))
        ){
           ctx.response.redirect(`${ctx.URL.pathname}?roomId=${gameManager.createRoomId()}`);
        }
        // console.log('redirect： ',ctx.URL.searchParams.get('roomeId'),'pathname: ',ctx.URL.pathname);
        
    }
}