import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as Path from 'path';
import TouchGame from './Plugins/TouchGame';

const app = new Koa();

app.use( KoaStatic(Path.resolve(__dirname,'../static'),{defer: true}) );

app.use( TouchGame( /^\/$/, 8000 ) );

app.listen(3000);
console.log(" http://localhost:3000");