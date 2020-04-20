import Endpoint from "../Endpoint";
import S from "fluent-schema";
import {AUTHENTICATION_MIN_USER_LEN, AUTHENTICATION_PASSWORD_RULE, JWT_PRIVATE, TOKEN_EXPIRE_TIME} from "../settings";
import User from "../database/files/Users.model";
import UserPermission from "../database/files/Permissions.model";
import jwt from 'jsonwebtoken';
import ComparatorAll from "../comparators/ComparatorAll";
import * as messages from "../messages"
import {message} from "../messages"
import StringArrayComparatorContain from "../comparators/string_array/StringArrayComparatorContain";

export default new Endpoint("users").addCallback(
    "POST",
    "/user_login",
    async (req, res) => {
        let user_obj = await User.findByPk(req.body.username, {include: [UserPermission]});
        try {
            if (!user_obj) throw Error("ENOFOUND");
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
            if (Object.keys(messages).includes(ex.message)) {
                // @ts-ignore
                return messages[ex.message](res)
            }
            return message(500, "-", ex.message);
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
    {}
).addAuthCallback(
    new StringArrayComparatorContain("utenti"),
    "GET",
    "",
    async (req, res) => {
        let users = await User.findAll({include: [UserPermission]});
        if (users === null) return messages.EUSRERR(res);
        //@ts-ignore
        return users.map(e => ({
            username: e.username,
            name: e.name ?? e.username,
            permissions: e.permissions.map(i => i.group)
        }));
    },
    {}
).addAuthCallback(
    new StringArrayComparatorContain("utenti"),
    "PATCH",
    "",
    async (req, res) => {
        let user = await User.findByPk(req.body.username);
        if (user === null) return messages.EUSRERR(res);

        if (req.body.newpassword) {
            if (!req.body.oldpassword) return messages.EINVCRED(res);
            try {
                user.authenticate(req.body.oldpassword);
                user.password = req.body.newpassword;
            } catch (ex) {
                if (Object.keys(messages).includes(ex.message)) {
                    // @ts-ignore
                    return messages[ex.message](res)
                }
                return message(500, "-", ex.message);
            }
        }

        user.name = req.body.name;
        try {
            await user.save();
            await UserPermission.destroy({where: {username: req.body.username}});
            await Promise.all(req.body.permissions.map(async (e: string) => await UserPermission.create({
                username: req.body.username,
                group: e
            })));
        } catch (e) {
            return messages.EINTERR(res);
        }

        return (await User.findAll({
            where: {username: req.body.username},
            include: [UserPermission]
        })).map(e => ({username: e?.username, name: e?.name, permissions: e?.permissions.map(e => e.group)}));
    },
    {
        body: S.object()
            .prop('username', S.string().required())
            .prop('name', S.string().required())
            .prop('permissions', S.array().items(S.string()).required())
            .prop('newpassword', S.string())
            .prop('oldpassword', S.string())
    }
).addAuthCallback(
    new StringArrayComparatorContain("utenti"),
    "PUT",
    "",
    async (req, res) => {
        try{
            if(req.body.username.length < AUTHENTICATION_MIN_USER_LEN) throw Error("EUSRNINV");
            let reg = new RegExp(AUTHENTICATION_PASSWORD_RULE.join(''), 'g');
            if (!(req.body.password.match(reg)?.length)) throw Error("EINVCRED");

            await User.build({username: req.body.username, name: req.body.name ?? req.body.username, password: req.body.password}).save();
            await Promise.all(req.body.permissions.map(async (e: string) => await UserPermission.create({
                username: req.body.username,
                group: e
            })));
        } catch (ex) {
            if (Object.keys(messages).includes(ex.message)) {
                // @ts-ignore
                return messages[ex.message](res)
            }
            return message(500, "-", ex.message);
        }

        return (await User.findAll({
            where: {username: req.body.username},
            include: [UserPermission]
        })).map(e => ({username: e?.username, name: e?.name, permissions: e?.permissions.map(e => e.group)}));
    }, {
        body: S.object()
            .prop('username', S.string().required())
            .prop('name', S.string())
            .prop('permissions', S.array().items(S.string()).required())
            .prop('password', S.string().required())
    }
).addAuthCallback(
    new StringArrayComparatorContain("utenti"),
    "DELETE",
    "",
    async (req, res) => {
        try{
            await User.destroy({where: {username: req.body.username}});
            await UserPermission.destroy({where: {username: req.body.username}})
        } catch (ex) {
            if (Object.keys(messages).includes(ex.message)) {
                // @ts-ignore
                return messages[ex.message](res)
            }
            return message(500, "-", ex.message);
        }

        return {status: "ok"}
    }, {
        body: S.object()
            .prop('username', S.string().required())
    }
);