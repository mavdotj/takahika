import { Application, Router } from "@oak/oak";
import client from "./client.ts";
const clientHTML = decodeURIComponent(atob(client));
const app = new Application()
const router = new Router()

router.get('/', (context) => {
    context.response.body = clientHTML
    context.respond = true;
})

app.use(router.allowedMethods())
app.use(router.routes())

app.listen({ port: 3030, hostname: '0.0.0.0' });