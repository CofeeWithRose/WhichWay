import * as WebSocket from 'ws';
export enum MessageType{
   
    LOGIN = 'login',

    ADD_PLAYER = 'addPlayer',

    DELETE_PLAYER = 'deletePlayer',

    SHOW_START = 'showStart',

    HIDE_START ='hideStart',

    START ='start',
    
}

export interface GameManagerInterface{
    
    /**
     * 校验 roomId 是否可用.
     * @param roomId 
     */
    checkRoomId( roomId: number):boolean;

    /**
     * 生成 roomId.
     */
    createRoomId(): number;

    /**
     * 消息处理.
     * @param data 
     * @param ws 
     */
    onMessage(data:WebSocket.Data, ws:WebSocket): void;

    /**
     * 登录处理.
     * @param message 
     * @param ws 
     */
    onLogin(message: {type: string, roomId: number|string, currentMileSeconds: number }, ws: WebSocket):void;

    /**
     * 登出处理.
     * @param ws 
     */
    onLogOut(ws: WebSocket): void;
    
}