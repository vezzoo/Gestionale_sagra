import Endpoint from "../Endpoint";
import S from "fluent-schema";
import {AUTHENTICATION_MIN_USERNAME_LENGTH} from "../settings";
import User from "../database/files/Users.model";
import UserPermission from "../database/files/Permissions.model";

export default new Endpoint("users").addCallback(
    "POST",
    "/user_login",
    async (req, res) => {
        let user_obj = await User.findByPk(req.body.username, {include: [UserPermission]});
        try{
            if(!user_obj) throw Error("User not found");
            user_obj.authenticate(req.body.password);
            res.code(200);
            // @ts-ignore
            let permissions = user_obj.permissions.map(e => e.group);
            return {
                name: user_obj.name,
                permissions
            }
        } catch (ex){
            res.code(403);
            return {
                message: ex.message
            }
        }
    },
    {
        body: S.object()
            .prop('username', S.string()
                .minLength(AUTHENTICATION_MIN_USERNAME_LENGTH)
            )
            .prop('password', S.string())
    }
);