import { serve } from "bun";
import { compileVsx } from "./veact/compiler";
const server = serve({
  port: 3000,
  routes: {
    "/": async () => {
      const index = await Bun.file("./pages/index.vsx").text()
      const html = compileVsx(index)
      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    },
  },
});

console.log(`Listening on localhost:${server.port}`);