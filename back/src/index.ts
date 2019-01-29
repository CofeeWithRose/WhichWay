import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as Path from 'path';
import * as Fs from 'fs';
import TouchGame from './Plugins/TouchGame';

interface ServerConfig{
    httpPort: number;
    gameSocketPort: number;
}

const serverConfig:ServerConfig = JSON.parse(Fs.readFileSync(Path.resolve(process.cwd(), './server-config.json'), 'utf-8'));


const app = new Koa();

app.use( KoaStatic(Path.resolve(__dirname,'../static'),{defer: true}) );

app.use( TouchGame( /^\/$/, serverConfig.gameSocketPort ) );

app.listen(serverConfig.httpPort);
console.log(`http://localhost:${serverConfig.httpPort}`);