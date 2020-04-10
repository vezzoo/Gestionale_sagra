import Endpoint from "../Endpoint";
import S from "fluent-schema";

export default new Endpoint("utils").addCallback(
    "GET",
    "/ping",
    async (req, res) => {
        if(req.headers['name']) return `PONG ${req.headers['name']}`;
        return "PONG";
    },
    {
        headers: S.object().prop('name', S.string())
    }
);