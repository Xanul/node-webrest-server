import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {

  const server = new Server({port: 3000, public_path: 'public'});
  server.start();

}