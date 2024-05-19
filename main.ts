import { Application, Router } from "@oak/oak";
import client from "./client.ts";
const clientHTML = atob(client);
const app = new Application()
const router = new Router()

router.get('/', (context) => {
    context.response.body = clientHTML
    context.respond = true;
})

app.use(router.allowedMethods())
app.use(router.routes())

app.listen({ port: 80, hostname: '0.0.0.0' });