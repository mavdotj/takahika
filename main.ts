import { Wooter,c } from "@bronti/wooter";

const app = Wooter.withMethods();
const html = Deno.readFileSync("./index.html")

app.GET(c.chemin(), ({ resp }) => {
  resp(new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  }))
})

export default { fetch: app.fetch }