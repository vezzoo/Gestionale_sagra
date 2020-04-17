import {FastifyReply} from "fastify";
import {ServerResponse} from "http";

export const message = (ret_code: number, code: string, message: string) => (res: FastifyReply<ServerResponse>, o?: any):any => {
    if(ret_code) res.code(ret_code);
    return Object.assign({code, message, std: true}, o ?? {});
};

export const EUNOFOUND = message(403, "EUNOFOUND", "user not found");
export const EINVCRED = message(403, "EINVCRED", "user not found");
export const EUNOTEN = message(403, "EUNOTEN", "user not found");
