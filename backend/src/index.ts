import "regenerator-runtime/runtime.js";
import fastify from 'fastify'
import {API_ROOT, WEBSERVER_BIND, WEBSERVER_PORT} from "./settings";
import Endpoint from "./Endpoint";

export class MainLoop {
    private readonly server: fastify.FastifyInstance;

    constructor() {
        this.server = fastify({logger: true});
    }

    add(ep: Endpoint):MainLoop {
        ep._add(this.server, API_ROOT);
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
import users from "./login/users";
(async function(mainloop: MainLoop) {
    await (DatabaseInterface.getDatabase().connect()
        .then((db) => db.addModel(UserPermission))
        .then((db) => db.addModel(User))
        .then((db) => db.finalize()));

    await new User({username:"administrator", password:'admin'}).save();
    await new UserPermission({username:'administrator', group: 'root'}).save();

    await mainloop.exec();
})(
    new MainLoop()
        .add(utils_ping)
        .add(users)
);
