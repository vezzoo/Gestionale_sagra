import {FastifyReply} from "fastify";
import {ServerResponse} from "http";

export const message = (ret_code: number, code: string, message: string) => (res: FastifyReply<ServerResponse>, o?: any):any => {
    if(ret_code) res.code(ret_code);
    return Object.assign({code, message, std: true}, o ?? {});
};

export const EUNOFOUND = message(403, "EUNOFOUND", "EUNOFOUND user not found");
export const EINVCRED = message(403, "EINVCRED", "EINVCRED invalid credentials");
export const EUNOTEN = message(403, "EUNOTEN", "EUNOTEN not enabled");
export const EUSRERR = message(500, "EUSRERR", "EUSRERR user fetch error");
export const EJWTINVPAY = message(403, "EJWTINVPAY", "EJWTINVPAY jwt invalid payload");
export const ENORIGHTS = message(403, "ENORIGHTS", "ENORIGHTS user not cleared rights rule")
export const EJWTEXP = message(403, "EJWTEXP", "EJWTEXP jwt expired")
export const ENOJWT = message(403, "ENOJWT", "ENOJWT jwt not provided")
export const EINTERR = message(500, "EINTERR", "EINTERR internal error, you screwed it up")
export const EUSRNINV = message(400, "EUSRNINV", "EUSRNINV username too short")