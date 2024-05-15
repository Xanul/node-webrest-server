import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {

  const server = new Server({
    port: 3000, 
    public_path: 'public',
    routes: AppRoutes.routes
  });
  server.start();

}