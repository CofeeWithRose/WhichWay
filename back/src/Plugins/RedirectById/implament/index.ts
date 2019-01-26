import * as Koa from "koa";
import SocketClientManager from './SocketManager';




export default function RedirectById(pathNameReg: RegExp){

    const socketClientManager = new  SocketClientManager();
    
    return (ctx: Koa.ParameterizedContext<any,{}>, next:()=> Promise<any> )=>{
        if(
            pathNameReg.test(ctx.URL.pathname) && 
            !socketClientManager.hasRoomId(Number( ctx.URL.searchParams.get('roomId')))
        ){
           ctx.response.redirect(`${ctx.URL.pathname}?roomId=${socketClientManager.createRoomId()}`);
        }
        // console.log('redirect： ',ctx.URL.searchParams.get('roomeId'),'pathname: ',ctx.URL.pathname);
        
    }
}