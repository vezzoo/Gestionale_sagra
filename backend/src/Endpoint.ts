import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {ServerResponse} from "http";
import {ObjectSchema} from "fluent-schema";

export default class Endpoint {
    private readonly base_path: string;

    private eps: any[] = [];

    constructor(base_path: string) {
        this.base_path = base_path;
    }

    addCallback(method: string, url: string,  handler: (req: FastifyRequest, res: FastifyReply<ServerResponse>) => any, schema?: { body?: ObjectSchema, querystring?: ObjectSchema, params?: ObjectSchema, headers?: ObjectSchema }, oth: any = {}, handle_errors = true): Endpoint {
        this.eps.push(Object.assign({
            method,
            url: `/${this.base_path}/${url}`.replace(/\/\//g, "/"),
            schema: schema,
            attachValidation: handle_errors,
            handler
        }, oth));
        return this;
    }

    _add(server: FastifyInstance) {
        this.eps.forEach(e => {
            console.log("Loading endpoint", e.url);
            server.route(e)
        });
    }
}