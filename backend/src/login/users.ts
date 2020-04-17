import Endpoint from "../Endpoint";
import S from "fluent-schema";
import {JWT_PRIVATE, TOKEN_EXPIRE_TIME} from "../settings";
import User from "../database/files/Users.model";
import UserPermission from "../database/files/Permissions.model";
import jwt from 'jsonwebtoken';
import ComparatorAll from "../comparators/ComparatorAll";
import * as messages from "../messages"
import {message} from "../messages";

export default new Endpoint("users").addCallback(
    "POST",
    "/user_login",
    async (req, res) => {
        let user_obj = await User.findByPk(req.body.username, {include: [UserPermission]});
        try {
            if (!user_obj) throw Error("EUNOFOUND");
            user_obj.authenticate(req.body.password);
            res.code(200);
            // @ts-ignore
            let permissions = user_obj.permissions.map(e => e.group);

            let token = jwt.sign({
                username: user_obj.username,
                name: user_obj.name,
                permissions: user_obj.permissions
            }, JWT_PRIVATE, {algorithm: 'RS256', expiresIn: TOKEN_EXPIRE_TIME});

            return {
                name: user_obj.name ?? user_obj.username,
                permissions,
                token
            }
        } catch (ex) {
            if(Object.keys(messages).includes(ex.message)) {
                // @ts-ignore
                return messages[ex.message](res)
            }
            return message(500, "-", ex.message)(res);
        }
    },
    {
        body: S.object()
            .prop('username', S.string().required())
            .prop('password', S.string().required())
    }
).addAuthCallback(
    new ComparatorAll(),
    "GET",
    "/alive",
    async (req, res) => {
        return {status: "alive"}
    },
    {});