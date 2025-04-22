import { sql, serve } from "bun";

const server = serve({
  port: 3000,
  routes: {
    "/": () => new Response("Welcome to Bun!"),
  },
});

console.log(`Listening on localhost:${server.port}`);