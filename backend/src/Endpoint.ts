import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {ServerResponse} from "http";
import {ObjectSchema} from "fluent-schema";
import Comparator from "./comparators/Comparator";
import {AUTHENTICATION_HEADER, JWT_PUBLIC} from "./settings";
import jwt from 'jsonwebtoken'



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

    addAuthCallback(permissions: Comparator<String[]>, method: string, url: string,  handler: (req: FastifyRequest, res: FastifyReply<ServerResponse>, user: {username: string, name: string, permissions: string[]}) => any, schema?: { body?: ObjectSchema, querystring?: ObjectSchema, params?: ObjectSchema, headers?: ObjectSchema }, oth: any = {}, handle_errors = true): Endpoint {
        this.eps.push(Object.assign({
            method,
            url: `/${this.base_path}/${url}`.replace(/\/\//g, "/"),
            schema: schema,
            attachValidation: handle_errors,
            handler: async (req: FastifyRequest, res: FastifyReply<ServerResponse>) => {
                let token = req.headers[AUTHENTICATION_HEADER];
                try {
                    // @ts-ignore
                    let user_data: {username: string, name: string, permissions: string[]} = jwt.verify(token, JWT_PUBLIC);
                    if(!user_data?.permissions) throw Error("Invalid Payload");
                    if(!permissions.eval(user_data.permissions ?? []) && user_data.permissions.indexOf("root") !== -1) throw Error("Invalid Credentials");
                    return await handler(req, res, user_data);
                } catch (e) {
                    res.code(403);
                    return {
                        message: e.message
                    }
                }
            }
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