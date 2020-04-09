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
import User from "./database/files/Users.model";
import UserPermission from "./database/files/Permissions.model";
import users from "./utils/users";
(async function(mainloop: MainLoop) {
    await (DatabaseInterface.getDatabase().connect()
        .then((db) => db.addModel(UserPermission))
        .then((db) => db.addModel(User))
        .then((db) => db.finalize()));

    await mainloop.exec();
})(
    new MainLoop()
        .add(utils_ping)
        .add(users)
);



