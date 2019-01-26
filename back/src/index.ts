import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as Path from 'path';
import RedirectById from './plugins/RedirectById/implament';

const app = new Koa();

app.use(KoaStatic(Path.resolve(__dirname,'../static'),{defer: true}));

app.use( RedirectById(/^\/$/) );


// app.use(async (ctx, next) => {
// //   await next();
// //   const rt = ctx.response.get('X-Response-Time');
//   console.log(ctx.url);
// });

// // x-response-time

// app.use(async (ctx, next) => {
// //   const start = Date.now();
// //   await next();
// //   const ms = Date.now() - start;
// //   ctx.set('X-Response-Time', `${ms}ms`);
// });

// // response

// app.use(async ctx => {
// //   ctx.body = 'Hello World';
// });

app.listen(3000);
console.log(" http://localhost:3000");