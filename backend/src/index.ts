import "regenerator-runtime/runtime.js";
import fastify from 'fastify'
import {WEBSERVER_BIND, WEBSERVER_PORT} from "./settings";
import Endpoint from "./Endpoint";

export class MainLoop {
    private readonly server: fastify.FastifyInstance;

    constructor() {
        this.server = fastify({logger: true});
    }

    add(ep: Endpoint):MainLoop {
        ep._add(this.server);
        return this;
    }

    async exec(){
        await this.server.listen(WEBSERVER_PORT, WEBSERVER_BIND);
    }
}

import utils_ping from "./utils/ping";
(async function(mainloop: MainLoop) {

    await mainloop.exec();
})(
    new MainLoop()
        .add(utils_ping)
);



