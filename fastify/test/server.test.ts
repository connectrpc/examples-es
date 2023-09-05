import t from "tap";
import { build } from "../server.js";

t.test("GET /", async (t) => {
    const app = await build();
    const res = await app.inject({
        method: "GET",
        url: "/"
    });
    t.same(res.statusCode, 200);
    t.same(res.headers["content-type"], "text/html");
    t.ok(res.body.length > 0);
});

t.test("GET /webclient.js", async (t) => {
    const app = await build();
    const res = await app.inject({
        method: "GET",
        url: "/webclient.js"
    });
    t.same(res.statusCode, 200);
    t.ok(res.body.length > 0);
});
