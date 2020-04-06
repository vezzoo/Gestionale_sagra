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
import DatabaseInterface from "./database/DatabaseInterface";
import MyModel from "./database/files/MyModel.model";
(async function(mainloop: MainLoop) {
    await DatabaseInterface.getDatabase().connect()
        .then((db) => db.addModel(MyModel));


    await mainloop.exec();
})(
    new MainLoop()
        .add(utils_ping)
);



